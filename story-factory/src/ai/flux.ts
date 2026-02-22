import { fal } from "@fal-ai/client";
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Generates an image using Flux.1 [pro] via Fal.ai
 * @param prompt The cinematic prompt for the image
 * @returns The URL of the generated image
 */
export async function generateFluxImage(prompt: string): Promise<string | null> {
  const apiKey = process.env.FAL_KEY;
  if (!apiKey) {
    throw new Error('FAL_KEY is not set in environment variables');
  }

  // Configure the client with your API key
  fal.config({
    credentials: apiKey,
  });

  try {
    console.log('🎨 Generating high-fidelity frame with Flux Pro v1.1...');
    
    const result: any = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: prompt,
        image_size: { width: 720, height: 1280 }, // Explicit dimensions
        aspect_ratio: "portrait_16_9", 
        enable_safety_checker: true
      },
      logs: true,
    });

    console.log('DEBUG: Flux API Result:', JSON.stringify(result, null, 2));

    // Support nested data property or direct property
    const data = result.data || result;

    if (data && data.images && data.images.length > 0) {
      const img = data.images[0];
      if (img.width > img.height) {
        console.warn(`⚠️ Warning: Flux returned a landscape image (${img.width}x${img.height}) but we requested portrait!`);
      }
      return img.url;
    }
    
    if (data && data.image) {
      return data.image.url;
    }
    
    console.warn('⚠️ Flux API returned no images. Result:', JSON.stringify(result));
    return null;
  } catch (error: any) {
    const errorDetail = error.response?.data || error.message || error;
    console.error('Error generating image with Flux:', JSON.stringify(errorDetail, null, 2));
    return null;
  }
}

