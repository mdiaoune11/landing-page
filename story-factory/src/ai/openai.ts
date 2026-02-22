import axios from 'axios';
import dotenv from 'dotenv';
import type { AnimationStyle } from './styles.js';

dotenv.config();

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function generateDramaticStory() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  const prompt = `
    You are a world-class biopic screenwriter and auteur director known for deeply human, emotionally resonant storytelling. 
    Create an immersive, cinematic story about a REAL character from modern history (approx. 1900s to present) who lived a truly fascinating life.
    
    WRITING PHILOSOPHY:
    - CINEMATIC STRUCTURE: Like a high-end movie trailer or a key sequence from a biopic.
    - SHOW, DON'T TELL: Never say a character is "determined" or "broken." Show the "cracked skin on their knuckles as they hit the heavy bag for the tenth hour" or the "trembling hands as they sign the papers that change history."
    - SIMPLE, POWERFUL LANGUAGE: Use clear, punchy, and grounded English. Avoid flowery "AI adjectives." Every word must earn its place.
    - EMOTIONAL ARC: Focus on their personal struggles, their unlikely rise, the core conflicts that defined them, and their final legacy.

    STORY STRUCTURE:
    1. THE HOOK: A powerful, immediate opening that drops us into a pivotal moment.
    2. THE STRUGGLE: The human cost of their ambition or the weight of their circumstances.
    3. THE TURNING POINT: The exact moment where destiny shifted.
    4. THE LEGACY: The lasting impact they left on the world, often revealed through a dramatic climax or a final, poignant image.

    REQUIREMENTS:
    - CHARACTER: A real person. Avoid generic tropes. Focus on the human behind the history.
    - PERSPECTIVE: Third-person, deeply intimate and grounded.
    - LENGTH: Approx 400-450 words.
    
    VOCAL CUES:
    - Use ... for heavy, weighted pauses.
    - Use -- for sudden emotional shifts or sharp transitions.
    
    STYLE: Emotional, epic yet grounded, inspirational yet honest.
    
    OUTPUT FORMAT:
    JSON object: { "subject": "name", "script": "...", "suggestedGender": "male" }
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = JSON.parse(response.data.choices[0].message.content);
    return {
      subject: content.subject || 'Unknown',
      script: content.script || '',
      suggestedGender: content.suggestedGender || 'male'
    };
  } catch (error) {
    console.error('Error generating dramatic story:', error);
    return null;
  }
}

export async function rewriteStory(title: string, content: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables');
  }

  const prompt = `
    You are a professional thriller and suspense narrator. 
    Rewrite the following story into a compelling, suspenseful thriller script for a 60-second cinematic video.
    
    1. Start with an IRRESISTIBLE, VIRAL HOOK. The first sentence must be so shocking that the viewer cannot scroll away.
    2. Use SIMPLE, ACCESSIBLE language. Wording should be easy for everyone to understand, while keeping a formal, cinematic thriller vibe.
    3. Build atmosphere and tension rapidly within the 60-second timeframe.
    4. The story should lead to a sharp, unsettling conclusion or cliffhanger.
    5. Output ONLY the story text. No technical notes, labels, or markdown code blocks (e.g. no \` \` \`).
    
    VOCAL CUES FOR NARRATION:
    - Use dashes (--) for sudden shifts in thought or chilling realizations.
    - Use ellipses (...) for building heavy suspense.
    - Use ALL CAPS sparingly for intense emphasis.
    - Use punctuation to dictate a deliberate, tense pace.
    
    TITLE: ${title}
    STORY: ${content}
    
    Output only the script.
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error rewriting story with OpenAI:', error);
    return null;
  }
}

export async function generateImage(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1792', // Vertical for Reels/TikTok
        quality: 'hd',     // Higher detail for facial consistency
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.data[0].url;
  } catch (error: any) {
    if (error.response?.data?.error?.message) {
      console.error('❌ DALL-E Error:', error.response.data.error.message);
    } else {
      console.error('Error generating image with DALL-E:', error.message);
    }
    return null;
  }
}

export async function generateCharacterReference(script: string, style: AnimationStyle) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    Based on this story script, identify and describe ALL recurring characters as a "Canonical Identity Lock" for a high-end cinematic ${style.name} production.
    
    CRITICAL: You are creating a master production model. This character MUST look identical in every single frame of the film.
    
    For each character, you MUST provide a HARD LOCK description that ensures 100% facial and physical consistency across different frames. Describe them with "actor-like" precision suited for the ${style.name} aesthetic:
    - FACE: Sharp bone structure, defined jawline, and specific skin tone. Focus on unique identifiers (scars, moles, specific wrinkles, birthmarks). No vague descriptions.
    - EYES: Exact shape (e.g., deep-set, almond), iris color (specific shade like "iced blue" or "burnt amber"), and spacing.
    - HAIR: Precise style (length, texture, part), and exact color.
    - BODY: Exact proportions, height, and silhouette.
    - OUTFIT: A single, "signature" production outfit that reflects the ${style.name} world. Describe materials with extreme detail (e.g., "worn dark-brown bomber jacket with a cracked leather texture and a frayed wool collar").
    - DEFINING FEATURES: Any permanent physical trait that must be present in every shot.

    Rule: Treat the character as a single digital asset that is reused. Use a list format: "CHARACTER NAME: [Identity Lock Description]".
    
    STYLE CONTEXT: The character must exist within the ${style.name} aesthetic: ${style.visualDescription}.
    
    SCRIPT: ${script}
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating character reference:', error);
    return null;
  }
}

export async function segmentStory(script: string, style: AnimationStyle, numScenes: number = 6) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    Break the following story script into exactly ${numScenes} distinct visual panels for a high-end cinematic ${style.name} biopic production.
    
    DIRECTOR'S MANDATE: Every scene must visually portray EXACTLY what the narrator is describing in real time. 
    NO abstract imagery. NO unrelated symbolism. Each shot is a DIRECT CINEMATIC TRANSLATION of the spoken words.
    
    You are acting as a professional Film Director and Cinematographer. Each panel should capture a key emotional beat or a pivotal moment in the character's life. 

    IMPORTANT: You must return a valid JSON object with a key "scenes" containing an array of EXACTLY ${numScenes} objects. 
    
    Each object must have:
    1. "text": The EXACT portion of the script text that belongs to that scene.
    2. "visual": A detailed visual description that LITERALLY matches the text. Focus on the human element and physical actions.
    3. "shot_type": Cinematic shot type (e.g., "Extreme Close-up", "Wide Establishing Shot", "Low-angle Hero Shot").
    4. "camera_movement": Artistic movement (e.g., "Slow, emotional push-in", "Subtle handheld breathing", "Static, solemn frame").
    5. "duration": A number between 2 and 6. Match the pacing of the words.
    6. "atmosphere": The emotional weight. Use the ${style.name} aesthetic.
    7. "lighting": Specific cinematic lighting from the style: ${style.visualDescription}.
    8. "weather_objects": Specific sensory details matching the narration.
    9. "sfx_prompt": Precise sound design matched to on-screen actions (e.g., "The sharp click of a brass lighter", "The crunch of dry leaves under a heavy boot").
    10. "music_cue": Emotional biopic score cues.
    
    STRICT STYLE LOCK: Every scene must adhere to the ${style.name} aesthetic: ${style.aesthetic}.
    
    SCRIPT: ${script}
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = JSON.parse(response.data.choices[0].message.content);
    
    if (content.scenes && Array.isArray(content.scenes)) {
      return content.scenes;
    } else if (Array.isArray(content)) {
      return content;
    }
    
    console.error('Unexpected JSON structure from OpenAI:', content);
    return null;
  } catch (error: any) {
    console.error('Error segmenting story:', error.response?.data || error.message);
    return null;
  }
}

export async function segmentStoryIntoBeats(script: string, style: AnimationStyle) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    Break the following story script into ultra-short "beats", each lasting 3–5 seconds.
    For EACH beat, generate three distinct visual moments:
    a) Main Image (core visual that represents the line)
    b) Flash Cut (0.2s – shocking, high-contrast, attention-grabbing)
    c) Cinematic Hold (slow, emotional, dramatic, 1–2s)

    DIRECTOR'S MANDATE: Every visual must directly match or metaphorically amplify the narration. 
    Optimize for retention, suspense, and emotional impact.

    IMPORTANT: For "main_image_prompt", "flash_cut_prompt", and "cinematic_hold_prompt", describe ONLY the literal subjects, actions, and framing. 
    DO NOT include style keywords like "cinematic," "hyper-realistic," "detailed," or any mention of the art style itself, as the style is handled by a separate system. Focus on WHAT is happening, not HOW it is drawn.

    You must return a valid JSON object with a key "beats" containing an array of beats.
    Each beat object must have:
    1. "narration": The EXACT portion of the script text for this beat.
    2. "duration": A number between 3.0 and 5.0 (seconds).
    3. "main_image_prompt": A detailed visual prompt for the core visual (DALL-E 3/Flux style).
    4. "flash_cut_prompt": A shocking, high-contrast prompt (0.2s duration).
    5. "cinematic_hold_prompt": A dramatic, emotional, slow-paced prompt.
    6. "character_voice": One of ["NARRATOR", "PROTAGONIST", "ANTAGONIST"]. Choose based on the tone of the line.

    STYLE LOCK: Every prompt must adhere to the ${style.name} aesthetic: ${style.visualDescription}.
    TECHNICAL SPECS: Vertical aspect ratio (9:16), high-fidelity, cinematic textures.

    SCRIPT: ${script}
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = JSON.parse(response.data.choices[0].message.content);
    return content.beats || [];
  } catch (error: any) {
    console.error('Error segmenting story into beats:', error.response?.data || error.message);
    return [];
  }
}

export async function generateVisualPrompt(scene: any, characterRef: string, sceneIndex: number, totalScenes: number, style: AnimationStyle) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    You are a world-class Director of Photography and Visual Storyteller for epic human biopics. 
    Scene ${sceneIndex + 1} of ${totalScenes}.

    CRITICAL RULE: CHARACTER IDENTITY LOCK. 
    If a character is present, they must be rendered with 100% facial and physical consistency based on the ASSET LIBRARY. 
    Use the EXACT character details provided. NO variations in face, skin, or clothing. 
    Focus on LITERALLY portraying the scene text: "${scene.text}".

    ASSET LIBRARY:
    ${characterRef}

    SCENE SPECIFICATIONS:
    - ACTION: ${scene.visual}
    - SHOT TYPE: ${scene.shot_type}
    - CAMERA MOVEMENT: ${scene.camera_movement}
    - ATMOSPHERE: ${scene.atmosphere}
    - LIGHTING: ${scene.lighting}
    - ENVIRONMENT: ${scene.weather_objects}

    PRODUCTION RULES (ZERO STYLE DRIFT):
    1. AESTHETIC: This is a ${style.name} production. Aesthetic: ${style.aesthetic}.
    2. TECHNICAL SPECS: ${style.visualDescription}. High-fidelity details, visible textures, no AI artifacts, no generic filler, no visual "slop."
    3. COMPOSITION: ${scene.shot_type}. The frame should feel grand yet intimate.
    4. CAMERA MOTION: ${scene.camera_movement}. 
    5. TEXTURE: Cinematic film grain, raw human textures, hyper-detailed materials (leather, cloth, metal). 
    6. Aspect Ratio: MUST be vertical (9:16).

    Output ONLY the final DALL-E 3 / Flux rendering prompt. Be literal, be cinematic, and eliminate all AI artifacts.
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a professional prompt engineer. Output ONLY the final image generation prompt. No labels, no quotes, no extra text.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    let content = response.data.choices[0].message.content;
    // Clean up if it still includes quotes or labels
    content = content.replace(/^["']|["']$/g, '');
    content = content.replace(/^Final DALL-E 3 rendering prompt: /i, '');
    content = content.replace(/^Render a /i, 'Render a '); // Ensure it starts correctly if cleaned too much
    return content.trim();
  } catch (error) {
    console.error('Error generating visual prompt:', error);
    return null;
  }
}

/**
 * Generates a descriptive prompt for background music based on the story script.
 */
export async function generateMusicPrompt(script: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    Based on the following script, act as a professional Film Composer for an epic human biopic. 
    Generate a music prompt for Minimax Music that captures the emotional scale of a human life—its triumphs, tragedies, and lasting legacy.
    
    The prompt should specify:
    1. Genre/Style (e.g., epic cinematic orchestral, intimate solo piano and cello, inspiring minimalist strings).
    2. Emotional Arc (e.g., from quiet struggle to triumphant swell, mournful reflection leading to an epic climax).
    3. Instrumentation/Texture (e.g., deep cinematic horns, tremolo violins, ethereal choir, grounded acoustic elements).

    The goal is a score that feels like a modern epic biopic (e.g., Oppenheimer, The Theory of Everything, Ford v Ferrari).
    
    SCRIPT: ${script}
    
    Output ONLY the music prompt text.
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const result = response.data.choices[0].message.content.trim();
    // Clean up special characters that might break other APIs
    return result.replace(/[;:"']/g, '').trim();
  } catch (error) {
    console.error('Error generating music prompt:', error);
    return 'Dark cinematic thriller ambient music, building suspense, low strings and atmospheric pads';
  }
}

/**
 * Generates metadata for a high-impact rapid-fire intro sequence.
 */
export async function generateIntroMetadata(subject: string, script: string, style: AnimationStyle) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const prompt = `
    You are a professional Creative Director for high-end cinematic biopics. 
    Based on the subject "${subject}" and the following script, create metadata for a high-impact "Viral Intro" sequence.
    
    The sequence consists of 6 rapid-fire "burst" images (0.2s each) and 1 dedicated "Title Reveal" frame.

    DIRECTOR'S MANDATE FOR INTRO BURST:
    - EVERY frame in the burst MUST be directly relevant to the story's subject, specific time period, characters, and unique themes.
    - NO generic visuals. NO stock-looking shots. NO abstract fillers (e.g., no generic clocks, no generic eyes, no generic "scary" shadows).
    - EACH image must serve as a meaningful visual foreshadowing of the narrative that follows.
    - If the story is about a 1920s jazz musician, the burst should show specific details like "nicotine-stained fingers on a worn brass saxophone key" or "a tattered 1925 New Orleans jazz club flyer," NOT just a "music note."
    - Be LITERALLY specific to the subject "${subject}" and the script content.

    REQUIREMENTS:
    1. THE BURST (6 items): For each item, provide a highly specific "prompt" for DALL-E 3 that captures a high-impact, narrative-critical detail. 
       - Use the ${style.name} aesthetic: ${style.aesthetic}
       - Include technical keywords from: ${style.visualDescription}
       - Ensure the prompts are grounded in the specific history and setting of the story.
    2. THE TITLE REVEAL: Provide a "visual_prompt" for the background of the title frame that is the ULTIMATE thematic summary of the story, and "title_animation" instructions (e.g., "glitch", "smoke", "flicker", "shake").

    IMPORTANT: You must return a valid JSON object.
    
    Output Format:
    {
      "burst": [
        { "prompt": "..." },
        { "prompt": "..." },
        { "prompt": "..." },
        { "prompt": "..." },
        { "prompt": "..." },
        { "prompt": "..." }
      ],
      "title_frame": {
        "visual_prompt": "...",
        "title_animation": "..."
      }
    }

    STORY SCRIPT: ${script}
  `;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that outputs only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating intro metadata:', error);
    return null;
  }
}

