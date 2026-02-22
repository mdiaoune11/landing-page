import axios from 'axios';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const LUMA_API_URL = 'https://api.lumalabs.ai/dream-machine/v1/generations';

export async function generateVideo(imageUrl: string, prompt: string) {
  const apiKey = process.env.LUMA_API_KEY;
  if (!apiKey || apiKey === 'your_luma_api_key_here') {
    throw new Error('LUMA_API_KEY is not set or is the placeholder. Please add your real Luma API key to .env');
  }

  try {
    console.log('🎬 Triggering Luma Dream Machine (Image-to-Video)...');
    const response = await axios.post(
      LUMA_API_URL,
      {
        model: 'ray-2',
        prompt: prompt,
        keyframes: {
          frame0: {
            type: 'image',
            url: imageUrl
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
      }
    );

    return response.data.id;
  } catch (error: any) {
    console.error('Error triggering Luma video:', error.response?.data || error.message);
    return null;
  }
}

export async function waitForVideo(generationId: string): Promise<string | null> {
  const apiKey = process.env.LUMA_API_KEY;
  const pollInterval = 10000; // 10 seconds

  console.log(`⏳ Waiting for Luma animation (ID: ${generationId})...`);

  while (true) {
    try {
      const response = await axios.get(`${LUMA_API_URL}/${generationId}`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });

      const status = response.data.state;
      console.log(`   Current Status: ${status}`);

      if (status === 'completed') {
        return response.data.assets.video;
      } else if (status === 'failed') {
        console.error('❌ Luma generation failed:', response.data.failure_reason);
        return null;
      }

      // Wait before polling again
      await new Promise(resolve => setTimeout(resolve, pollInterval));
    } catch (error: any) {
      console.error('Error polling Luma status:', error.response?.data || error.message);
      return null;
    }
  }
}

export async function downloadVideo(videoUrl: string, outputFilename: string) {
  try {
    console.log('📥 Downloading animated video...');
    const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
    const outputPath = path.join(process.cwd(), 'assets', outputFilename);
    fs.writeFileSync(outputPath, response.data);
    return outputPath;
  } catch (error) {
    console.error('Error downloading video:', error);
    return null;
  }
}

