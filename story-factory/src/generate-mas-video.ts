import { generateDramaticStory, segmentStoryIntoBeats, generateCharacterReference, generateIntroMetadata, generateMusicPrompt } from './ai/openai.js';
import { ANIMATION_STYLES } from './ai/styles.js';
import { generateFluxImage } from './ai/flux.js';
import { generateSpeech, generateSoundEffect } from './ai/elevenlabs.js';
import { generateBackgroundMusic } from './ai/fal.js';
import { transcribeAudio } from './ai/transcribe.js';
import { generateAssSubtitles } from './video/captions.js';
import { stitchMultipleScenesWithAudio, createIntroSequence, createBeatClip } from './video/processor.js';
import * as dotenv from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

dotenv.config();

async function downloadFile(url: string, filename: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), 'assets', filename);
  try {
    const response = await axios({ url, method: 'GET', responseType: 'stream' });
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

async function main() {
  console.log('🎬 Starting Meta Africa Sports Video Generation...');

  const selectedStyle = ANIMATION_STYLES.find(s => s.name === "Afrofuturist Legend") || ANIMATION_STYLES[3];
  
  const script = `
    In the heart of Africa, a revolution is rising. 
    Beyond the dusty courts and the echoes of the village, a new generation of giants is waiting to be found. 
    The world is watching, but they’re only seeing the surface. 
    At Meta Africa Sports, we go deeper. 
    We don’t just find players; we verify legends. 
    In-depth scouting reports. Curated game film. Real data that elite recruiters trust. 
    From the courts of Lagos to the arenas of the NCAA... 
    We are the gateway. We are the bridge. 
    Meta Africa Sports. The future of basketball is here. 
    Are you ready to discover the next great star?
  `.trim();

  const subject = "Meta Africa Sports";

  console.log('🎙️ Generating voiceover...');
  const audioPath = await generateSpeech(script, `mas_audio_${Date.now()}.mp3`, 'NARRATOR');
  if (!audioPath) return;

  console.log('📜 Transcribing for captions...');
  const words = await transcribeAudio(audioPath);
  const assPath = await generateAssSubtitles(words, `mas_subtitles_${Date.now()}.ass`, 0);

  console.log('🎵 Generating background music...');
  const musicPrompt = "Epic cinematic Afrofuturist orchestral score, blending traditional African percussion with modern cinematic strings and brass, building to a triumphant and inspiring climax.";
  const musicPath = await generateBackgroundMusic(musicPrompt, `mas_music_${Date.now()}.mp3`);

  console.log('🎨 Generating intro sequence...');
  const introMetadata = await generateIntroMetadata(subject, script, selectedStyle);
  let introPath: string | null = null;
  if (introMetadata) {
    const stylePrefix = `${selectedStyle.aesthetic}. ${selectedStyle.visualDescription}.`;
    const introBurstPrompts = introMetadata.burst.map((b: any) => `${stylePrefix} ${b.prompt}`);
    const titlePrompt = `${stylePrefix} A majestic golden basketball hoop rising from a map of Africa, glowing neon accents, cinematic 8k.`;
    
    const introImageUrls = await Promise.all([...introBurstPrompts, titlePrompt].map(p => generateFluxImage(p)));
    const validIntroUrls = introImageUrls.filter(u => u !== null) as string[];
    
    if (validIntroUrls.length >= 7) {
      const burstPaths = await Promise.all(validIntroUrls.slice(0, 6).map((url, i) => downloadFile(url, `mas_burst_${i}_${Date.now()}.png`)));
      const titleImagePath = await downloadFile(validIntroUrls[6], `mas_title_bg_${Date.now()}.png`);
      if (burstPaths.every(p => p !== null) && titleImagePath) {
        introPath = await createIntroSequence(burstPaths as string[], titleImagePath, "META AFRICA SPORTS", "flicker", `mas_intro_${Date.now()}.mp4`);
      }
    }
  }

  console.log('🎬 Segmenting script into beats...');
  const beats = await segmentStoryIntoBeats(script, selectedStyle);
  const sceneVideoPaths: string[] = [];
  const sceneSfxPaths: { path: string; sceneIndex: number }[] = [];

  const whooshPath = await generateSoundEffect('Cinematic high-impact transition whoosh, deep bass swell', `mas_whoosh_${Date.now()}.mp3`, 1.5);

  for (let i = 0; i < beats.length; i++) {
    const beat = beats[i];
    console.log(`🥁 Rendering Beat ${i + 1}/${beats.length}...`);
    const stylePrefix = `${selectedStyle.aesthetic}. ${selectedStyle.visualDescription}.`;
    
    const [mainUrl, flashUrl, holdUrl] = await Promise.all([
      generateFluxImage(`${stylePrefix} ${beat.main_image_prompt}`),
      generateFluxImage(`${stylePrefix} ${beat.flash_cut_prompt}`),
      generateFluxImage(`${stylePrefix} ${beat.cinematic_hold_prompt}`)
    ]);

    if (!mainUrl || !flashUrl || !holdUrl) continue;

    const [mainPath, flashPath, holdPath] = await Promise.all([
      downloadFile(mainUrl, `mas_main_${i}_${Date.now()}.png`),
      downloadFile(flashUrl, `mas_flash_${i}_${Date.now()}.png`),
      downloadFile(holdUrl, `mas_hold_${i}_${Date.now()}.png`)
    ]);

    if (!mainPath || !flashPath || !holdPath) continue;

    const beatClipPath = await createBeatClip(mainPath, flashPath, holdPath, beat.duration, `mas_beat_${i + 1}_${Date.now()}.mp4`);
    if (beatClipPath) {
      sceneVideoPaths.push(beatClipPath);
      if (whooshPath) sceneSfxPaths.push({ path: whooshPath, sceneIndex: sceneVideoPaths.length - 1 + (introPath ? 1 : 0) });
    }
  }

  if (sceneVideoPaths.length > 0) {
    const finalFilename = `meta_africa_sports_60s_${Date.now()}.mp4`;
    const finalVideoPath = await stitchMultipleScenesWithAudio(
      [introPath, ...sceneVideoPaths].filter(p => p !== null) as string[],
      audioPath,
      musicPath,
      sceneSfxPaths,
      finalFilename,
      assPath,
      [introPath ? 5.4 : 0, ...beats.map(b => b.duration)].filter(d => d > 0),
      0
    );

    if (finalVideoPath) {
      console.log(`✅ VIDEO COMPLETE: ${finalVideoPath}`);
    }
  }
}

main().catch(console.error);
