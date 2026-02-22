import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

/**
 * Transcribes an audio file and returns word-level timestamps.
 * Uses OpenAI Whisper v3 large.
 */
export async function transcribeAudio(audioPath: string): Promise<WordTimestamp[]> {
  console.log(`🎙️ Transcribing audio for captions: ${audioPath}...`);
  
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: "whisper-1",
      response_format: "verbose_json",
      timestamp_granularities: ["word"],
    });

    const words = (transcription as any).words;
    if (!words || !Array.isArray(words)) {
      console.warn('⚠️ No word-level timestamps found in transcription.');
      return [];
    }

    return words.map((w: any) => ({
      word: w.word,
      start: w.start,
      end: w.end,
    }));
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return [];
  }
}

