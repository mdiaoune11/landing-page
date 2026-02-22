export interface AnimationStyle {
  name: string;
  visualDescription: string;
  animationDescription: string;
  aesthetic: string;
}

export const ANIMATION_STYLES: AnimationStyle[] = [
  {
    name: "Painterly Epic (Arcane / Oil)",
    aesthetic: "hand-painted expressive oil painting aesthetic",
    visualDescription: "Thick impasto brushstrokes, visible paint texture, rich color blending, dramatic chiaroscuro lighting, high-contrast highlights, inspired by Arcane and classical oil masterpieces.",
    animationDescription: "Fluid painterly motion, boiling paint textures, slow dramatic zooms, sweeping brushstroke transitions, dynamic light play across textured surfaces"
  },
  {
    name: "Rotoscope True Story",
    aesthetic: "hand-drawn rotoscoped documentary aesthetic",
    visualDescription: "Distinct ink outlines over realistic forms, flattened color planes, slight jitter in lines, naturalistic proportions, grounded and gritty textures, inspired by A Scanner Darkly and Waltz with Bashir.",
    animationDescription: "Fluid but slightly jittery frame-by-frame hand-drawn motion, subtle line boil, realistic human movement, cinematic documentary-style camera work"
  },
  {
    name: "Noir Thriller",
    aesthetic: "classic cinematic black and white noir aesthetic",
    visualDescription: "Stark monochrome palette, deep pitch-black shadows, harsh key lighting, venetian blind patterns, rain-slicked streets, silhouettes, volumetric smoke, inspired by classic 1940s film noir.",
    animationDescription: "Slow atmospheric tracking shots, pulsing light through rain, flickering silhouettes, steady dramatic push-ins, high-contrast shadow movement"
  },
  {
    name: "Afrofuturist Legend",
    aesthetic: "vibrant neon Afrofuturist aesthetic",
    visualDescription: "Deep indigo and violet skies, glowing gold intricate African patterns, bioluminescent flora, advanced crystalline technology, majestic scale, rich earthy skin tones with metallic accents.",
    animationDescription: "Graceful floating camera, pulsing energy symbols, cosmic particle flows, grand architectural reveals, ethereal light trails"
  },
  {
    name: "Watercolor Memory",
    aesthetic: "soft bleeding watercolor animation aesthetic",
    visualDescription: "Soft wet-on-wet edges, pigment bleeds, paper texture, desaturated pastel tones, hazy atmospheres, minimalist detail focusing on emotional highlights, dreamlike quality.",
    animationDescription: "Dreamy slow-motion, blooming color transitions, subtle wind-like distortion, gentle shifts in pigment density, floating memory-like fragments"
  },
  {
    name: "Graphic Novel Motion",
    aesthetic: "bold high-contrast graphic novel aesthetic",
    visualDescription: "Heavy ink lines, halftone dot patterns, cross-hatching textures, limited color palette with bold accent colors, dramatic comic-book framing, dynamic perspective.",
    animationDescription: "Stylized parallax depth, snappy rhythmic cuts, sliding panel transitions, animated action lines, kinetic energy bursts"
  },
  {
    name: "Surreal Dream",
    aesthetic: "surrealist double-exposure dream aesthetic",
    visualDescription: "Impossible architecture, floating elements, double exposure layering, melting textures, soft ethereal glow, shifts in gravity, symbolic objects, inspired by Dali and Inception.",
    animationDescription: "Hypnotic warping motion, seamless spatial transitions, floating camera, shifting textures, dreamlike slow-motion focus"
  },
  {
    name: "Shadow Puppet Theater",
    aesthetic: "traditional shadow puppet silhouette aesthetic",
    visualDescription: "Sharp black silhouettes against warm glowing parchment, intricate paper-cut details, lantern light flicker, slight paper texture, muted earthy background tones.",
    animationDescription: "2D mechanical joint movement, flickering candlelight effects, subtle paper wobble, side-scrolling theater perspective, rhythmic silhouette transitions"
  },
  {
    name: "Hyper-Real 3D Cinema",
    aesthetic: "ultra-detailed Unreal Engine 5 cinematic aesthetic",
    visualDescription: "8k digital sharpness, ray-traced lighting, realistic sub-surface scattering on skin, cinematic lens flares, physical-based rendering (PBR), depth of field, industrial precision.",
    animationDescription: "Grand smooth crane shots, precision robotic tracking, high-speed kinetic action, atmospheric dust motes, ultra-realistic material physics"
  },
  {
    name: "Ancient Fresco Come Alive",
    aesthetic: "animated Renaissance mural fresco aesthetic",
    visualDescription: "Cracked plaster texture, faded earth pigments, classical Renaissance composition, gold leaf accents, flat depth of field, aged mural look, religious and mythic iconography.",
    animationDescription: "Slow majestic awakening, subtle cracking paint effects, floating dust of ages, grand religious scale, slow-burn emotional reveals"
  },
  {
    name: "Samurai Ink Wash",
    aesthetic: "Japanese Sumi-e ink wash aesthetic",
    visualDescription: "Elegant black ink strokes on rice paper, minimal color (red accents), vast white space (Ma), flowing liquid ink textures, poetic and minimal compositions.",
    animationDescription: "Poetic ink flow, fast rhythmic sword-stroke motion, bleeding ink transitions, subtle paper texture movement, high-contrast action bursts"
  },
  {
    name: "Clay Stop-Motion",
    aesthetic: "tactile hand-sculpted claymation aesthetic",
    visualDescription: "Visible fingerprints in clay, sculpted textures, studio miniature lighting, vibrant solid colors, high-key lighting, depth of field from small-scale macro lens.",
    animationDescription: "Subtle frame-by-frame jitter, tactile stop-motion movement, squish-and-stretch clay physics, charmingly imperfect frame rate"
  },
  {
    name: "Cyberpunk History",
    aesthetic: "neon-infused cyberpunk future-past aesthetic",
    visualDescription: "Neon signs reflected in rain, holographic data overlays, high-tech integrated with old-world architecture, sharp electric blues and pinks, dense industrial textures.",
    animationDescription: "Glitchy digital transitions, flickering neon, fast-paced kinetic camera, high-speed data streams, atmospheric rain movement"
  },
  {
    name: "Silent Film 1920s",
    aesthetic: "1920s vintage silent film aesthetic",
    visualDescription: "Heavy film grain, scratches and dust, soft focus edges, high-contrast black and white, dramatic theatrical acting expressions, vignette framing.",
    animationDescription: "Slightly sped-up movement (crank-style), flickering frame rate, dramatic iris-in/out transitions, rhythmic film-burn flashes"
  },
  {
    name: "Mythic Anime Epic",
    aesthetic: "high-budget cinematic anime aesthetic",
    visualDescription: "Intricate hand-drawn backgrounds, dramatic eyes with detailed reflections, cinematic lighting effects, wind-blown hair and fabric, vibrant saturated colors, speed lines.",
    animationDescription: "Dynamic high-speed camera tracking, explosive particle effects, dramatic slow-motion impact frames, fluid wind movement"
  },
  {
    name: "Oil on Glass Animation",
    aesthetic: "flowing oil-on-glass paint aesthetic",
    visualDescription: "Translucent layers of oil paint, light passing through glass, wet flowing textures, surreal blending of forms, rich and deep saturation, inspired by Aleksandr Petrov.",
    animationDescription: "Seamless morphing transitions, liquid-like paint movement, ethereal light shifts, visceral and tactile texture flow"
  },
  {
    name: "Paper Cut-Out Parallax",
    aesthetic: "multi-plane paper cut-out aesthetic",
    visualDescription: "Layered paper edges, visible paper grain, shadow depth between layers, storybook charm, hand-painted paper textures, naive and flat perspective.",
    animationDescription: "Parallax depth movement, 2D puppet-style motion, sliding environment layers, mechanical paper-flip transitions"
  },
  {
    name: "Glitch Time-Fracture",
    aesthetic: "distorted VHS glitch and memory fragmentation aesthetic",
    visualDescription: "Chromatic aberration, datamoshing, scan lines, pixel sorting, fragmented imagery, CRT monitor glow, desaturated and distorted colors.",
    animationDescription: "Aggressive digital glitching, memory fragmentation effects, sudden frame skips, pulsing distortion, fractured spatial movement"
  },
  {
    name: "Light & Smoke Silhouettes",
    aesthetic: "volumetric light and silhouette aesthetic",
    visualDescription: "Thick volumetric fog, intense god rays, sharp glowing outlines, minimal environmental detail, focus on shape and atmosphere, cool blues and warm ambers.",
    animationDescription: "Ethereal slow-motion, drifting smoke particles, pulsing light sources, dramatic silhouette movement, atmospheric focus shifts"
  },
  {
    name: "Bronze Statue Come Alive",
    aesthetic: "monumental bronze statue aesthetic",
    visualDescription: "Oxidized bronze textures, teal and copper palette, massive scale, metallic sheen, intricate sculpted detail, weathered and epic monumental feel.",
    animationDescription: "Slow powerful awakening, heavy metallic movement, grinding stone and metal sound-visuals, grand scale camera pans"
  }
];

export function getRandomStyle(): AnimationStyle {
  return ANIMATION_STYLES[Math.floor(Math.random() * ANIMATION_STYLES.length)];
}
