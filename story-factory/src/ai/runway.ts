import RunwayML from '@runwayml/sdk';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const runway = new RunwayML({
  apiKey: process.env.RUNWAY_API_KEY,
});

/**
 * Generates a video using Runway Gen-4 Turbo
 * @param imageUrl The reference image URL (from Flux)
 * @param prompt The cinematic animation prompt
 * @param duration The requested duration in seconds (5 or 10 for Gen-4 Turbo usually)
 * @returns The generation ID
 */
export async function generateRunwayVideo(imageUrl: string, prompt: string, duration: number = 5) {
  if (!process.env.RUNWAY_API_KEY) {
    throw new Error('RUNWAY_API_KEY is not set. Please add it to your .env file.');
  }

  try {
    console.log(`🎬 Triggering Runway Gen-4 Turbo (Image-to-Video, ${duration}s)...`);
    
    // Ensure duration is valid for Runway (usually 5 or 10, but we'll try what's passed)
    const validDuration = duration > 5 ? 10 : 5;
    
    const imageToVideo = await runway.imageToVideo.create({
      model: 'gen4_turbo',
      promptText: prompt,
      promptImage: imageUrl,
      duration: validDuration,
      ratio: '720:1280'
    });

    return imageToVideo.id;
  } catch (error: any) {
    console.error('Error triggering Runway video:', error.message || error);
    return null;
  }
}

/**
 * Polls Runway API until the video generation is complete
 * @param generationId The ID of the generation task
 * @returns The final video URL or null
 */
export async function waitForRunwayVideo(generationId: string): Promise<string | null> {
  const pollInterval = 5000; // 5 seconds

  console.log(`⏳ Waiting for Runway animation (ID: ${generationId})...`);

  while (true) {
    try {
      const task = await runway.tasks.retrieve(generationId);
      const status = task.status;
      
      console.log(`   Current Status: ${status}`);

      if (status === 'SUCCEEDED') {
        console.log('DEBUG: Runway Task on Success:', JSON.stringify(task, null, 2));
        // Runway API returns an array of artifacts
        if (task.artifacts && task.artifacts.length > 0) {
          return task.artifacts[0].url;
        }
        // Fallback for different response formats
        if ((task as any).output && Array.isArray((task as any).output) && (task as any).output.length > 0) {
          return (task as any).output[0];
        }
        if ((task as any).url) {
          return (task as any).url;
        }
        console.warn('⚠️ Runway succeeded but no URL found in artifacts or output.');
        return null;
      } else if (status === 'FAILED') {
        console.error('❌ Runway generation failed:', task.failureCode || 'Unknown error');
        return null;
      } else if (status === 'CANCELLED') {
        console.error('❌ Runway generation cancelled.');
        return null;
      }

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    } catch (error: any) {
      console.error('Error polling Runway status:', error.message || error);
      return null;
    }
  }
}

/**
 * Downloads the video from Runway's CDN
 */
export async function downloadRunwayVideo(videoUrl: string, outputFilename: string) {
  try {
    console.log('📥 Downloading animated video from Runway...');
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const outputPath = path.join(process.cwd(), 'assets', outputFilename);
    fs.writeFileSync(outputPath, response.data);
    return outputPath;
  } catch (error) {
    console.error('Error downloading video:', error);
    return null;
  }
}

