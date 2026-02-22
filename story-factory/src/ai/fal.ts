import { fal } from "@fal-ai/client";
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

dotenv.config();

/**
 * Generates background music using Fal.ai (e.g., minimax-music/v2)
 * @param prompt The descriptive prompt for the music
 * @param outputFilename The filename to save the music to
 * @returns The path to the generated music file
 */
export async function generateBackgroundMusic(prompt: string, outputFilename: string): Promise<string | null> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    throw new Error('FAL_KEY is not set in environment variables');
  }

  // Configure the client with your API key
  fal.config({
    credentials: apiKey,
  });

  const maxRetries = 2;
  let attempts = 0;

  while (attempts <= maxRetries) {
    try {
      console.log(`🎵 Generating cinematic background music with Fal.ai (Stable Audio)... (Attempt ${attempts + 1})`);
      
      const result: any = await fal.run("fal-ai/stable-audio", {
        input: {
          prompt: prompt
        },
      });

      console.log('DEBUG: Fal Music API Result:', JSON.stringify(result, null, 2));

      const data = result.data || result;
      const audioUrl = data.audio_file?.url || data.audio?.url || data.audio_url || (data.images && data.images[0]?.url);

      if (audioUrl) {
        console.log(`🔗 Music generated! Downloading from: ${audioUrl}`);
        const outputPath = path.join(process.cwd(), 'assets', outputFilename);
        
        const response = await axios({
          method: 'get',
          url: audioUrl,
          responseType: 'stream'
        });

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', () => resolve(outputPath));
          writer.on('error', (err) => {
            console.error('Error writing music file:', err);
            reject(err);
          });
        });
      }
      
      console.warn('⚠️ Fal Music API returned no audio URL. Result:', JSON.stringify(result));
      return null;
    } catch (error: any) {
      attempts++;
      const errorDetail = error.response?.data || error.message || error;
      console.error(`Error generating music with Fal (Attempt ${attempts}):`, JSON.stringify(errorDetail, null, 2));
      
      if (attempts > maxRetries) {
        return null;
      }
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  return null;
}

