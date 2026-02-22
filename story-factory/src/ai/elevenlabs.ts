import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export async function generateSpeech(text: string, outputFilename: string, character: string = 'NARRATOR') {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  // High-engagement natural narration voices
  const voices: Record<string, string> = {
    'NARRATOR': process.env.ELEVENLABS_MALE_VOICE_ID || 'pNInz6obpgDQGcFmaJgB', // Adam
    'PROTAGONIST': 'EXAVITQu4vr4xnSDxMaL', // Bella (Female, soft but intense) or substitute
    'ANTAGONIST': 'VR6AewrXV7o9biSDeYpI', // Callum (Deep, gravelly)
  };

  const voiceId = voices[character] || voices['NARRATOR'];

  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set');
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  try {
    const response = await axios.post(
      url,
      {
        text: text,
        model_id: 'eleven_turbo_v2_5', // Latest model for maximum realism
        voice_settings: {
          stability: 0.45,        // Slightly increased for consistency
          similarity_boost: 0.8,  // Higher for more character presence
          style: 0.5,             // Adds emotional acting and nuance
          use_speaker_boost: true // Increases vocal clarity
        },
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const outputPath = path.join(process.cwd(), 'assets', outputFilename);
    fs.writeFileSync(outputPath, response.data);
    return outputPath;
  } catch (error) {
    console.error('Error generating speech with ElevenLabs:', error);
    return null;
  }
}

/**
 * Generates a sound effect using ElevenLabs Sound Effects API.
 */
export async function generateSoundEffect(prompt: string, outputFilename: string, durationSeconds?: number) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error('ELEVENLABS_API_KEY is not set');
  }

  const url = 'https://api.elevenlabs.io/v1/sound-generation';

  try {
    const response = await axios.post(
      url,
      {
        text: prompt,
        duration_seconds: durationSeconds, // Optional, between 0.5 and 22s
        prompt_influence: 0.3, // Lower for more creativity, higher for stricter adherence
      },
      {
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      }
    );

    const outputPath = path.join(process.cwd(), 'assets', outputFilename);
    fs.writeFileSync(outputPath, response.data);
    return outputPath;
  } catch (error: any) {
    console.error('Error generating sound effect with ElevenLabs:', error.response?.data?.toString() || error.message);
    return null;
  }
}

