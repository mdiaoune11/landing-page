import { exec } from 'child_process';
import util from 'util';
import path from 'path';
import fs from 'fs';
import ffprobe from 'ffprobe-static';

const execPromise = util.promisify(exec);

export async function getAudioDuration(audioPath: string): Promise<number> {
  // Use system ffprobe instead of ffprobe-static to avoid architecture mismatches
  const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`;
  try {
    const { stdout } = await execPromise(command);
    return parseFloat(stdout.trim());
  } catch (error) {
    console.error('Error getting audio duration with system ffprobe:', error);
    // Fallback to static if system fails
    try {
      const staticCommand = `"${ffprobe.path}" -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${audioPath}"`;
      const { stdout } = await execPromise(staticCommand);
      return parseFloat(stdout.trim());
    } catch (staticError) {
      return 60; // Default to 60s
    }
  }
}

/**
 * Assembles a video using an animated video background and an audio file.
 * The background video is looped to match the audio duration.
 * Requires FFmpeg installed on the system (brew install ffmpeg).
 */
export async function assembleVideoWithBackground(audioPath: string, videoBackgroundPath: string, outputFilename: string) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  
  console.log('🎬 Assembling final animated video with FFmpeg...');
  
  // Command details:
  // -stream_loop -1: Loop the input video infinitely
  // -i [video]: Animated background
  // -i [audio]: Voiceover
  // -c:v libx264: Video codec
  // -c:a aac: Audio codec
  // -map 0:v:0: Use video from first input
  // -map 1:a:0: Use audio from second input
  // -shortest: End when the shortest input (audio) ends
  // -pix_fmt yuv420p: High compatibility pixel format
  const command = `ffmpeg -y -stream_loop -1 -i "${videoBackgroundPath}" -i "${audioPath}" -map 0:v:0 -map 1:a:0 -c:v libx264 -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`;

  try {
    const { stdout, stderr } = await execPromise(command);
    console.log('✅ Final animated video assembled successfully!');
    return outputPath;
  } catch (error: any) {
    if (error.message.includes('command not found')) {
      console.error('❌ FFmpeg not found. Please install it using: brew install ffmpeg');
    } else {
      console.error('❌ Error during video assembly:', error.message);
    }
    return null;
  }
}

/**
 * Stitches multiple video clips together with clean jump cuts and adds an audio track.
 */
export async function stitchMultipleScenes(videoPaths: string[], audioPath: string, outputFilename: string) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  const tempFileList = path.join(process.cwd(), 'assets', `list_${Date.now()}.txt`);
  
  console.log(`🎬 Stitching ${videoPaths.length} panels together with clean jump cuts...`);
  
  try {
    // Create a temporary file list for FFmpeg concatenation
    const fileContent = videoPaths.map(p => `file '${p}'`).join('\n');
    fs.writeFileSync(tempFileList, fileContent);

    // Command detail:
    // -f concat: Use concatenation format
    // -safe 0: Allow absolute paths
    const command = `ffmpeg -y -f concat -safe 0 -i "${tempFileList}" -i "${audioPath}" -map 0:v:0 -map 1:a:0 -c:v libx264 -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`;

    const { stdout, stderr } = await execPromise(command);
    
    // Clean up temp file
    fs.unlinkSync(tempFileList);
    
    console.log('✅ Multi-scene video assembled successfully with jump cuts!');
    return outputPath;
  } catch (error: any) {
    console.error('❌ Error during multi-scene assembly:', error.message);
    if (fs.existsSync(tempFileList)) fs.unlinkSync(tempFileList);
    return null;
  }
}

/**
 * Checks if a specific FFmpeg filter is available.
 */
async function hasFilter(filterName: string): Promise<boolean> {
  try {
    const { stdout } = await execPromise('ffmpeg -filters');
    return stdout.includes(filterName);
  } catch (error) {
    return false;
  }
}

/**
 * Mixes multiple audio tracks into a final video.
 * - Voiceover (primary)
 * - Background music (looped, lower volume)
 * - Sound effects (timed to scenes)
 * - Subtitles (optional .ass file)
 */
export async function stitchMultipleScenesWithAudio(
  videoPaths: string[], 
  voiceoverPath: string, 
  backgroundMusicPath: string | null,
  sfxPaths: { path: string; sceneIndex: number }[],
  outputFilename: string,
  assPath: string | null = null,
  sceneDurations: number[] = [],
  voiceoverDelay: number = 0
) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  const tempFileList = path.join(process.cwd(), 'assets', `list_${Date.now()}.txt`);
  
  // Check if subtitles filter is actually supported by the installed FFmpeg
  const supportsSubtitles = assPath ? await hasFilter('subtitles') : false;
  
  if (assPath && !supportsSubtitles) {
    console.warn('⚠️ Warning: FFmpeg "subtitles" filter not found. Captions will be skipped.');
    console.warn('💡 Tip: Install FFmpeg with libass support (e.g., "brew install ffmpeg").');
  }

  console.log(`🎬 Stitching ${videoPaths.length} panels with mixed audio and ${supportsSubtitles ? 'subtitles' : 'no subtitles'}...`);
  
  try {
    // 1. Create temporary file list for video concatenation
    const fileContent = videoPaths.map(p => `file '${p}'`).join('\n');
    fs.writeFileSync(tempFileList, fileContent);

    // 2. Build the FFmpeg command
    let inputs = `-f concat -safe 0 -i "${tempFileList}" -i "${voiceoverPath}"`;
    if (backgroundMusicPath) {
      inputs += ` -stream_loop -1 -i "${backgroundMusicPath}"`;
    }
    
    for (const sfx of sfxPaths) {
      inputs += ` -i "${sfx.path}"`;
    }

    // 3. Construct the filter_complex
    let filterComplex = '';
    let mixCount = 2; // VO and Music
    
    // Video part: Add subtitles if path is provided and filter is supported
    // Also add a subtle cinematic film grain effect
    let videoFilter = '[0:v]noise=alls=12:allf=t+u[grained];';
    let currentVideoLabel = '[grained]';

    if (assPath && supportsSubtitles) {
      // Use relative path to avoid absolute path escaping issues in FFmpeg
      const relativeAssPath = path.relative(process.cwd(), assPath);
      // Even with relative paths, we need to escape single quotes
      const escapedAssPath = relativeAssPath.replace(/'/g, "'\\\\\\''");
      videoFilter += `${currentVideoLabel}subtitles='${escapedAssPath}'[outv];`;
    } else {
      videoFilter += `${currentVideoLabel}copy[outv];`;
    }
    filterComplex += videoFilter;

    // Audio part
    // We delay the voiceover (index 1) by the specified delay
    // For perfect opening impact, we ensure VO starts at exactly frame 0 if delay is 0
    const voDelayMs = Math.max(0, voiceoverDelay * 1000);
    filterComplex += `[1:a]adelay=${voDelayMs}|${voDelayMs},volume=1.0[vo];`;
    
    if (backgroundMusicPath) {
      // Music starts immediately at t=0
      // We use sidechain compression (ducking): music volume drops when VO is active
      // [1:a] is VO, [2:a] is Music
      // asidechaincompress: threshold=0.1, ratio=20, attack=5, release=200
      filterComplex += `[2:a]volume=0.25[bgm_raw];[bgm_raw][1:a]asidechaincompress=threshold=0.15:ratio=12:attack=5:release=500[bgm];`;
    } else {
      mixCount = 1;
    }

    // Calculate SFX delays based on variable scene durations
    let sfxOutputs = '';
    for (let i = 0; i < sfxPaths.length; i++) {
      const sfxInputIdx = backgroundMusicPath ? 3 + i : 2 + i;
      
      // Calculate delay by summing previous scene durations
      // For SFX precision, we sum exactly the durations of preceding clips
      let delayMs = 0;
      if (sceneDurations.length > 0) {
        for (let j = 0; j < sfxPaths[i].sceneIndex; j++) {
          delayMs += (sceneDurations[j] || 5) * 1000;
        }
      } else {
        delayMs = sfxPaths[i].sceneIndex * 5 * 1000;
      }

      const sfxLabel = `sfx${i}`;
      // Use high precision for SFX timing
      filterComplex += `[${sfxInputIdx}:a]adelay=${Math.round(delayMs)}|${Math.round(delayMs)},volume=0.8[${sfxLabel}];`;
      sfxOutputs += `[${sfxLabel}]`;
      mixCount++;
    }

    const musicLabel = backgroundMusicPath ? '[bgm]' : '';
    filterComplex += `[vo]${musicLabel}${sfxOutputs}amix=inputs=${mixCount}:duration=first:dropout_transition=2[outa]`;

    const videoMap = (assPath && supportsSubtitles) ? '[outv]' : '0:v:0';
    const command = `ffmpeg -y ${inputs} -filter_complex "${filterComplex}" -map "${videoMap}" -map "[outa]" -c:v libx264 -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`;

    const { stdout, stderr } = await execPromise(command);
    
    if (fs.existsSync(tempFileList)) fs.unlinkSync(tempFileList);
    
    console.log(`✅ Final video assembled successfully ${supportsSubtitles ? 'with' : 'WITHOUT'} captions!`);
    return outputPath;
  } catch (error: any) {
    console.error('❌ Error during audio-mixed assembly:', error.message);
    if (fs.existsSync(tempFileList)) fs.unlinkSync(tempFileList);
    return null;
  }
}

/**
 * Legacy support for static image videos (kept for compatibility)
 */
export async function assembleVideo(audioPath: string, imagePath: string, outputFilename: string) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  console.log('🎬 Assembling static video with FFmpeg...');
  const command = `ffmpeg -y -loop 1 -i "${imagePath}" -i "${audioPath}" -c:v libx264 -tune stillimage -c:a aac -b:a 192k -pix_fmt yuv420p -shortest "${outputPath}"`;
  try {
    await execPromise(command);
    console.log('✅ Static video assembled successfully!');
    return outputPath;
  } catch (error: any) {
    console.error('❌ Error during static video assembly:', error.message);
    return null;
  }
}

/**
 * Creates a high-retention 'beat' clip consisting of 3 visual moments:
 * 1. Main Image (40% of duration, zoom in)
 * 2. Flash Cut (Exactly 0.2s, sudden)
 * 3. Cinematic Hold (Remainder, slow zoom/pan)
 */
export async function createBeatClip(
  mainImg: string,
  flashImg: string,
  holdImg: string,
  totalDuration: number,
  outputFilename: string
) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  const tempFiles: string[] = [];
  
  try {
    const flashDuration = 0.2;
    const mainDuration = totalDuration * 0.4;
    const holdDuration = totalDuration - mainDuration - flashDuration;
    
    // 1. Create Main Image Clip (Ken Burns Zoom/Pan)
    const mainPath = path.join(process.cwd(), 'assets', `main_${Date.now()}.mp4`);
    // Randomize panning direction: 0 = center, 1 = left, 2 = right, 3 = top, 4 = bottom
    const panDir = Math.floor(Math.random() * 5);
    let panX = 'iw/2-(iw/zoom)/2';
    let panY = 'ih/2-(ih/zoom)/2';
    
    if (panDir === 1) panX = `(iw/2-(iw/zoom)/2)*(1-t/${mainDuration})`; // Pan Left
    if (panDir === 2) panX = `(iw/2-(iw/zoom)/2)*(t/${mainDuration})`;   // Pan Right
    if (panDir === 3) panY = `(ih/2-(ih/zoom)/2)*(1-t/${mainDuration})`; // Pan Top
    if (panDir === 4) panY = `(ih/2-(ih/zoom)/2)*(t/${mainDuration})`;   // Pan Bottom

    const mainCmd = `ffmpeg -y -loop 1 -i "${mainImg}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.004,1.5)':x='${panX}':y='${panY}':d=${Math.round(mainDuration * 30)}:s=1080x1920:fps=30" -t ${mainDuration} -r 30 -c:v libx264 -pix_fmt yuv420p "${mainPath}"`;
    await execPromise(mainCmd);
    tempFiles.push(mainPath);

    // 2. Create Flash Cut Clip (Medium Zoom for consistency)
    const flashPath = path.join(process.cwd(), 'assets', `flash_${Date.now()}.mp4`);
    const flashCmd = `ffmpeg -y -loop 1 -i "${flashImg}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.003,1.3)':x='iw/2-(iw/zoom)/2':y='ih/2-(ih/zoom)/2':d=${Math.round(flashDuration * 30)}:s=1080x1920:fps=30" -t ${flashDuration} -r 30 -c:v libx264 -pix_fmt yuv420p "${flashPath}"`;
    await execPromise(flashCmd);
    tempFiles.push(flashPath);

    // 3. Create Cinematic Hold Clip (Slow Zoom/Pan)
    const holdPath = path.join(process.cwd(), 'assets', `hold_${Date.now()}.mp4`);
    const holdPanDir = Math.floor(Math.random() * 5);
    let hPanX = 'iw/2-(iw/zoom)/2';
    let hPanY = 'ih/2-(ih/zoom)/2';
    
    if (holdPanDir === 1) hPanX = `(iw/2-(iw/zoom)/2)*(1-t/${holdDuration})`;
    if (holdPanDir === 2) hPanX = `(iw/2-(iw/zoom)/2)*(t/${holdDuration})`;
    
    const holdCmd = `ffmpeg -y -loop 1 -i "${holdImg}" -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.002,1.2)':x='${hPanX}':y='${hPanY}':d=${Math.round(holdDuration * 30)}:s=1080x1920:fps=30" -t ${holdDuration} -r 30 -c:v libx264 -pix_fmt yuv420p "${holdPath}"`;
    await execPromise(holdCmd);
    tempFiles.push(holdPath);

    // 4. Concat all 3 parts
    const listFile = path.join(process.cwd(), 'assets', `beat_list_${Date.now()}.txt`);
    fs.writeFileSync(listFile, tempFiles.map(p => `file '${p}'`).join('\n'));
    
    const concatCmd = `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c:v libx264 -pix_fmt yuv420p "${outputPath}"`;
    await execPromise(concatCmd);
    
    fs.unlinkSync(listFile);
    for (const f of tempFiles) if (fs.existsSync(f)) fs.unlinkSync(f);
    
    return outputPath;
  } catch (error: any) {
    console.error('❌ Error creating beat clip:', error.message);
    for (const f of tempFiles) if (fs.existsSync(f)) fs.unlinkSync(f);
    return null;
  }
}

/**
 * Creates a high-impact intro sequence with a rapid image burst and a title reveal.
 */
export async function createIntroSequence(
  burstImagePaths: string[],
  titleImagePath: string,
  title: string,
  animationType: string = 'flicker',
  outputFilename: string
) {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  const tempFiles: string[] = [];

  console.log(`🎬 Creating high-impact intro: Burst (${burstImagePaths.length} images) + Title (${title})...`);

  try {
    // 1. Create individual 0.2s clips for burst images with zoom effect
    const burstClips: string[] = [];
    for (let i = 0; i < burstImagePaths.length; i++) {
      const clipPath = path.join(process.cwd(), 'assets', `burst_${i}_${Date.now()}.mp4`);
      // Zoompan effect for 0.4s (approx 12 frames at 30fps)
      // We use scale before zoompan to ensure consistent input size
      // We also force the output frame rate to 30fps
      const command = `ffmpeg -y -loop 1 -i "${burstImagePaths[i]}" -vf "scale=1080:1920,zoompan=z='min(zoom+0.005,1.5)':d=12:s=1080x1920:fps=30" -t 0.4 -r 30 -c:v libx264 -pix_fmt yuv420p "${clipPath}"`;
      await execPromise(command);
      burstClips.push(clipPath);
      tempFiles.push(clipPath);
    }

    // 2. Create the title frame clip (2 seconds)
    const titleClipPath = path.join(process.cwd(), 'assets', `title_${Date.now()}.mp4`);
    
    // Check if drawtext filter is available
    const supportsDrawtext = await hasFilter('drawtext');
    
    // Choose text animation filter based on type
    let textFilter = '';
    const escapedTitle = title.toUpperCase().replace(/'/g, "'\\\\\\''");
    
    // Common font paths on macOS
    const fontPath = '/System/Library/Fonts/Supplemental/Arial Black.ttf';
    const fontExists = fs.existsSync(fontPath);
    
    if (!supportsDrawtext) {
      console.warn('⚠️ Warning: FFmpeg "drawtext" filter not found. Title text will be skipped.');
      console.warn('💡 Tip: Reinstall FFmpeg with freetype support: "brew install ffmpeg"');
      textFilter = 'scale=1080:1920'; // Just scale if no text
    } else if (!fontExists) {
      console.warn(`⚠️ Warning: Font not found at ${fontPath}. Title text will be skipped.`);
      textFilter = 'scale=1080:1920';
    } else {
      // Enhanced cinematic typography with shadows for better readability
      const commonTextProps = `fontfile='${fontPath}':fontcolor=white:fontsize=130:x=(w-text_w)/2:y=(h-text_h)/2:shadowcolor=black:shadowx=5:shadowy=5:borderw=2:bordercolor=black`;
      
      if (animationType.includes('flicker')) {
        textFilter = `scale=1080:1920,drawtext=text='${escapedTitle}':${commonTextProps}:alpha='if(lt(random(0),0.2),0.5,1.0)'`;
      } else if (animationType.includes('glitch')) {
        textFilter = `scale=1080:1920,drawtext=text='${escapedTitle}':${commonTextProps}:x=(w-text_w)/2+random(15)-7:y=(h-text_h)/2+random(15)-7`;
      } else if (animationType.includes('shake')) {
        textFilter = `scale=1080:1920,drawtext=text='${escapedTitle}':${commonTextProps}:x=(w-text_w)/2+15*sin(t*25):y=(h-text_h)/2+15*cos(t*25)`;
      } else {
        textFilter = `scale=1080:1920,drawtext=text='${escapedTitle}':${commonTextProps}`;
      }
    }

    // We force the output frame rate to 30fps to match the burst clips
    const titleCommand = `ffmpeg -y -loop 1 -i "${titleImagePath}" -vf "${textFilter}" -t 3 -r 30 -c:v libx264 -pix_fmt yuv420p "${titleClipPath}"`;
    await execPromise(titleCommand);
    tempFiles.push(titleClipPath);

    // 3. Concatenate all clips
    const allClips = [...burstClips, titleClipPath];
    const listFile = path.join(process.cwd(), 'assets', `intro_list_${Date.now()}.txt`);
    fs.writeFileSync(listFile, allClips.map(p => `file '${p}'`).join('\n'));
    
    // Use re-encoding during concatenation for better stability
    const concatCommand = `ffmpeg -y -f concat -safe 0 -i "${listFile}" -c:v libx264 -pix_fmt yuv420p "${outputPath}"`;
    await execPromise(concatCommand);
    
    // Cleanup
    fs.unlinkSync(listFile);
    for (const f of tempFiles) {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }

    console.log('✅ Intro sequence created successfully!');
    return outputPath;
  } catch (error: any) {
    console.error('❌ Error creating intro sequence:', error.message);
    for (const f of tempFiles) {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    }
    return null;
  }
}
