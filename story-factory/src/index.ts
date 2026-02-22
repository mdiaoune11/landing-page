import { fetchTrendingStories } from './scrapers/reddit.js';
import { rewriteStory, segmentStory, segmentStoryIntoBeats, generateCharacterReference, generateVisualPrompt, generateDramaticStory, generateMusicPrompt, generateIntroMetadata } from './ai/openai.js';
import { getRandomStyle, ANIMATION_STYLES } from './ai/styles.js';
import type { AnimationStyle } from './ai/styles.js';
import { generateFluxImage } from './ai/flux.js';
import { generateSpeech, generateSoundEffect } from './ai/elevenlabs.js';
import { generateRunwayVideo, waitForRunwayVideo, downloadRunwayVideo } from './ai/runway.js';
import { generateBackgroundMusic } from './ai/fal.js';
import { transcribeAudio } from './ai/transcribe.js';
import { generateAssSubtitles } from './video/captions.js';
import { assembleVideoWithBackground, stitchMultipleScenes, getAudioDuration, stitchMultipleScenesWithAudio, createIntroSequence, createBeatClip } from './video/processor.js';
import { postToSocial } from './social/ayrshare.js';
import { uploadVideo } from './lib/storage.js';
import * as dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

dotenv.config();

const question = (query: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise<string>((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

/**
 * Cleans the AI-generated script for better readability as a social media caption.
 * Removes dramatic vocal cues (like dashes and ellipses) and technical markers.
 */
function cleanScriptForDisplay(text: string): string {
  return text
    .replace(/--/g, ', ')           // Replace dramatic dashes with natural commas
    .replace(/\.\.\./g, '.')        // Simplify ellipses for reading
    .replace(/([A-Z]{2,})/g, (m) => m.charAt(0) + m.slice(1).toLowerCase()) // Fix accidental ALL CAPS (YELLING)
    .replace(/\[.*?\]/g, '')        // Remove technical markers like [Narrator] or [Pause]
    .replace(/\s+/g, ' ')           // Remove double spaces
    .trim();
}

/**
 * Utility to download a file from a URL.
 */
async function downloadFile(url: string, filename: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'assets', filename);
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(filePath));
      writer.on('error', reject);
    });
  } catch (error) {
    console.error(`Error downloading file ${filename}:`, error);
    return null;
  }
}

/**
 * Allows the user to interactively choose a cinematic style.
 */
async function chooseStyle(): Promise<AnimationStyle> {
  console.log('\n🎭 CHOOSE A CINEMATIC STYLE MODULE:');
  ANIMATION_STYLES.forEach((style, index) => {
    console.log(`${(index + 1).toString().padStart(2, ' ')}. ${style.name}`);
  });

  while (true) {
    const answer = await question('\n👉 Select style number (1-20) or press Enter for random: ');
    
    if (answer === '') {
      const randomStyle = getRandomStyle();
      console.log(`🎲 Randomly selected: ${randomStyle.name}`);
      return randomStyle;
    }

    const index = parseInt(answer) - 1;
    if (index >= 0 && index < ANIMATION_STYLES.length) {
      console.log(`✅ Selected style: ${ANIMATION_STYLES[index].name}`);
      return ANIMATION_STYLES[index];
    }

    console.log(`❌ Invalid selection. Please enter a number between 1 and ${ANIMATION_STYLES.length}.`);
  }
}

async function main() {
  const isPreview = process.argv.includes('--preview');
  const skipApproval = process.argv.includes('--yes');
  console.log('🚀 Starting Story Factory' + (isPreview ? ' (PREVIEW MODE)' : '') + '...');

  const selectedStyle = await chooseStyle();

  let storyAccepted = false;
  let script = '';
  let currentStoryData: any = null;

  while (!storyAccepted) {
    // 1. Generate an original dramatic story
    console.log('📂 Generating an original dramatic story/novella...');
    const storyData = await generateDramaticStory();
    currentStoryData = storyData;
    script = storyData?.script || '';

    if (!script) {
      console.log('❌ Failed to generate story. Trying again...');
      continue;
    }

    console.log('\n--- PROPOSED DRAMATIC STORY ---');
    console.log(`WHO IS IT ABOUT: ${storyData?.subject}`);
    console.log('Narrator Style: MALE');
    console.log('-------------------------------');
    console.log(script);
    console.log('-------------------------------');

    if (skipApproval) {
      storyAccepted = true;
      continue;
    }

    const answer = await question('\n📖 Do you want to proceed with THIS story? (y = yes, n = generate another, q = quit): ');
    
    if (answer === 'y' || answer === 'Y' || answer === '') {
      storyAccepted = true;
    } else if (answer === 'q' || answer === 'Q') {
      console.log('👋 Generation cancelled by user.');
      return;
    } else {
      console.log('🔄 Generating another one...\n');
    }
  }

  // Proceed with the accepted story...
  console.log(`✅ Story accepted! Using style: ${selectedStyle.name}`);
  console.log('🚀 Starting full generation pipeline with male narrator...');

  // 1b. Generate High-Impact Viral Intro
  console.log('⚡ Generating High-Impact Viral Intro metadata...');
  const introMetadata = await generateIntroMetadata(currentStoryData?.subject || 'Unknown', script, selectedStyle);
  let introPath: string | null = null;

  if (introMetadata) {
    console.log('🎨 Generating intro burst images and title frame in parallel...');
    const stylePrefix = `${selectedStyle.aesthetic}. ${selectedStyle.visualDescription}.`;
    const introBurstPrompts = introMetadata.burst.map((b: any) => `${stylePrefix} ${b.prompt}`);
    const titlePrompt = `${stylePrefix} ${introMetadata.title_frame.visual_prompt}`;
    const titleAnimation = introMetadata.title_frame.title_animation;

    const allIntroPrompts = [...introBurstPrompts, titlePrompt];
    const introImageUrls = await Promise.all(allIntroPrompts.map(p => generateFluxImage(p)));
    
    const validIntroUrls = introImageUrls.filter(u => u !== null) as string[];
    
    if (validIntroUrls.length >= 7) {
      const burstUrls = validIntroUrls.slice(0, 6);
      const titleUrl = validIntroUrls[6];
      
      const burstPaths = await Promise.all(burstUrls.map((url, i) => downloadFile(url, `burst_${i}_${Date.now()}.png`)));
      const titleImagePath = await downloadFile(titleUrl, `title_bg_${Date.now()}.png`);
      
      if (burstPaths.every(p => p !== null) && titleImagePath) {
        introPath = await createIntroSequence(
          burstPaths as string[],
          titleImagePath,
          currentStoryData?.subject || 'STORY',
          titleAnimation,
          `intro_${Date.now()}.mp4`
        );
      }
    }
  }

  // 3. Generate Audio
  console.log('🎙️ Generating multi-voice cinematic narration...');
  // We'll generate individual audio clips for each beat to support multi-voice
  // But for now, we'll keep the single script generation for the main VO
  // and update the pipeline to support beat-by-beat VO in the next iteration.
  // For this version, we'll generate the full script with the Narrator voice.
  const audioPath = await generateSpeech(script, `audio_${Date.now()}.mp3`, 'NARRATOR');

  if (!audioPath) {
    console.log('❌ Failed to generate audio.');
    return;
  }

  // 3a. Generate Transcription and Subtitles
  console.log('📜 Generating word-level transcription for viral captions...');
  const words = await transcribeAudio(audioPath);
  let assPath: string | null = null;
  if (words.length > 0) {
    const subtitleOffset = 0; // Lock to t=0 for perfect sync with opening burst
    assPath = await generateAssSubtitles(words, `subtitles_${Date.now()}.ass`, subtitleOffset);
    console.log(`✅ Stylized subtitles ready (with ${subtitleOffset}s offset): ${assPath}`);
  } else {
    console.log('⚠️ Transcription failed. Proceeding without captions...');
  }

  // 3b. Generate Background Music
  console.log('🎵 Generating music prompt and background track...');
  const musicPrompt = await generateMusicPrompt(script);
  console.log(`💡 Music Prompt: ${musicPrompt}`);
  const musicPath = await generateBackgroundMusic(musicPrompt, `music_${Date.now()}.mp3`);
  if (musicPath) {
    console.log(`✅ Background music ready: ${musicPath}`);
  } else {
    console.log('⚠️ Failed to generate background music. Proceeding without it...');
  }

  // 4. Character Consistency & Beat Segmentation
  console.log(`👤 Creating HARD-LOCKED multi-character production library for ${selectedStyle.name}...`);
  const characterRef = await generateCharacterReference(script, selectedStyle);
  if (characterRef) {
    console.log('\n--- ASSET LIBRARY ---');
    console.log(characterRef);
    console.log('---------------------\n');
  }
  
  console.log(`🎬 Segmenting story into ultra-short high-impact beats (${selectedStyle.name} style)...`);
  const beats = await segmentStoryIntoBeats(script, selectedStyle);

  if (!beats || !Array.isArray(beats) || beats.length === 0) {
    console.log('❌ Failed to segment story into beats.');
    return;
  }

  const beatsToProcess = isPreview ? beats.slice(0, 5) : beats;
  console.log(`⏱️ Processing ${beatsToProcess.length} beats for maximum retention...`);

  const sceneVideoPaths: string[] = [];
  const sceneSfxPaths: { path: string; sceneIndex: number }[] = [];

  // 4b. Pre-generate cinematic transition "whooshes" for beat boundaries
  console.log('🔊 Generating cinematic transition whooshes...');
  const whooshPath = await generateSoundEffect('Cinematic high-impact transition whoosh, deep bass swell', `whoosh_${Date.now()}.mp3`, 1.5);
  if (whooshPath) {
    // Add whooshes at the start of each beat (after intro)
    for (let i = 0; i < beatsToProcess.length; i++) {
      sceneSfxPaths.push({ path: whooshPath, sceneIndex: i });
    }
  }

  // 5. Loop through beats
  for (let i = 0; i < beatsToProcess.length; i++) {
    const beat = beatsToProcess[i];
    if (!beat) continue;
    
    console.log(`\n🥁 RENDERING BEAT ${i + 1} OF ${beatsToProcess.length}...`);
    console.log(`Narration: "${beat.narration}"`);
    
    // Generate 3 images for the beat in parallel
    console.log(`🎨 Generating 3 visual moments for Beat ${i + 1} in parallel...`);
    const stylePrefix = `${selectedStyle.aesthetic}. ${selectedStyle.visualDescription}.`;
    const [mainUrl, flashUrl, holdUrl] = await Promise.all([
      generateFluxImage(`${stylePrefix} ${beat.main_image_prompt}. ${characterRef || ''}`),
      generateFluxImage(`${stylePrefix} ${beat.flash_cut_prompt}. ${characterRef || ''}`),
      generateFluxImage(`${stylePrefix} ${beat.cinematic_hold_prompt}. ${characterRef || ''}`)
    ]);

    if (!mainUrl || !flashUrl || !holdUrl) {
      console.log(`❌ Failed to generate one or more images for Beat ${i + 1}`);
      continue;
    }

    // Download images
    const [mainPath, flashPath, holdPath] = await Promise.all([
      downloadFile(mainUrl, `main_${i}_${Date.now()}.png`),
      downloadFile(flashUrl, `flash_${i}_${Date.now()}.png`),
      downloadFile(holdUrl, `hold_${i}_${Date.now()}.png`)
    ]);

    if (!mainPath || !flashPath || !holdPath) {
      console.log(`❌ Failed to download images for Beat ${i + 1}`);
      continue;
    }

    // Create the triple-moment beat clip
    console.log(`🎞️ Stitching Beat ${i + 1} clip (${beat.duration}s)...`);
    const beatClipPath = await createBeatClip(
      mainPath,
      flashPath,
      holdPath,
      beat.duration,
      `beat_${i + 1}_${Date.now()}.mp4`
    );

    if (beatClipPath) {
      sceneVideoPaths.push(beatClipPath);
    }
    
    // Cleanup images to save space
    [mainPath, flashPath, holdPath].forEach(p => { if (fs.existsSync(p)) fs.unlinkSync(p); });
  }

  // 6. Stitch All Beats
  if (sceneVideoPaths.length > 0) {
    const finalFilename = `final_story_${Date.now()}.mp4`;
    const finalVideoPath = await stitchMultipleScenesWithAudio(
      [introPath, ...sceneVideoPaths].filter(p => p !== null) as string[], 
      audioPath, 
      musicPath, 
      sceneSfxPaths.map(s => ({ ...s, sceneIndex: s.sceneIndex + (introPath ? 1 : 0) })), 
      finalFilename,
      assPath,
      [introPath ? 5.4 : 0, ...beatsToProcess.map(b => b.duration)].filter(d => d > 0),
      0 // VO start at frame 0 for perfect opening impact
    );

    if (finalVideoPath) {
      console.log(`🎬 SUCCESS! Multi-scene ${selectedStyle.name} story ready at: ${finalVideoPath}`);
      
      if (isPreview) {
        console.log('👀 Preview mode active. Skipping cloud upload and social posting.');
        return;
      }

      // 7. Upload and Post
      console.log('🚀 Final Step: Uploading and Posting to Social Media...');
      const publicUrl = await uploadVideo(finalVideoPath, finalFilename);
      if (publicUrl) {
        const displayCaption = cleanScriptForDisplay(script);
        const postResult = await postToSocial(publicUrl, displayCaption);
        if (postResult && postResult.status === 'success') {
          console.log('🎉 SUCCESSFULLY POSTED TO ALL PLATFORMS!');
        }
      }
    }
  } else {
    console.log('❌ No scenes were successfully generated.');
  }
}

main().catch((err) => {
  console.error(err);
});

