import fs from 'fs';
import path from 'path';
import type { WordTimestamp } from '../ai/transcribe.js';

/**
 * Generates an .ass (Advanced Substation Alpha) file for stylized viral captions.
 * Features: High-impact font, centered, color highlights on current word.
 */
export async function generateAssSubtitles(
  words: WordTimestamp[], 
  outputFilename: string,
  offsetSeconds: number = 0
): Promise<string | null> {
  const outputPath = path.join(process.cwd(), 'assets', outputFilename);
  
  // Header and Styles for the .ass file
  // Using generic "Arial Black" as a fallback, but "Komika Axis" or "The Bold Font" is better if installed.
  const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 720
PlayResY: 1280
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Arial Black,60,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,4,2,2,30,30,640,1
Style: Highlight,Arial Black,70,&H0000FFFF,&H000000FF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,4,2,2,30,30,640,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
`;

  let events = '';

  // Helper to format time for .ass (H:MM:SS.CC)
  const formatTime = (seconds: number) => {
    const totalSeconds = seconds + offsetSeconds;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    const c = Math.floor((totalSeconds % 1) * 100);
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${c.toString().padStart(2, '0')}`;
  };

  // Group words into short phrases (1-3 words) or just one by one for high speed
  // For the "Viral" look, we usually show 1-2 words at a time.
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const startTime = formatTime(word.start);
    const endTime = formatTime(word.end);
    
    // Create a "pop" effect with color and scale
    // Yellow highlight (&H0000FFFF) with a larger scale
    const text = `{\\pos(360,640)}{\\fscx120\\fscy120}{\\1c&H0000FFFF&}${word.word.toUpperCase()}{\\fscx100\\fscy100}`;
    
    events += `Dialogue: 0,${startTime},${endTime},Default,,0,0,0,,${text}\n`;
  }

  try {
    fs.writeFileSync(outputPath, header + events);
    return outputPath;
  } catch (error) {
    console.error('Error writing .ass file:', error);
    return null;
  }
}

