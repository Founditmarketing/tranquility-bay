import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Use public/assets
const assetsDir = path.join(process.cwd(), "public", "assets");

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const imagesToGenerate = [
  {
    name: "hero-bg.png",
    prompt: "Cinematic wide drone shot of a luxury lakefront resort at sunset on Toledo Bend Reservoir. Calm water reflecting the sky, modern architectural cabins nestled in pine trees, warm golden hour lighting, high-end atmosphere, photorealistic, 8k resolution."
  },
  {
    name: "cabin-luxury.png",
    prompt: "Exterior of a modern luxury cabin with floor-to-ceiling glass windows overlooking a calm lake. Large wooden deck with comfortable furniture, warm interior lighting glowing in the twilight, surrounded by tall pine trees, architectural photography style, 8k."
  },
  {
    name: "rv-site.png",
    prompt: "Premium luxury RV site with a spacious concrete pad, full hookups, nestled in a pine forest with a view of the lake. A high-end motorhome is parked, outdoor seating area with a fire pit, sunset lighting, photorealistic, 8k."
  },
  {
    name: "marina-boat.png",
    prompt: "A high-end marina with wooden docks and boat slips on a calm lake at dusk. Luxury boats docked, soft warm lighting on the docks, water reflections, peaceful atmosphere, photorealistic, 8k."
  },
  {
    name: "mobile-home.png",
    prompt: "A stylish, retro-modern glamping mobile suite. sleek exterior design, wooden deck with lounge chairs, lake in the background, cozy evening atmosphere with string lights, photorealistic, 8k."
  }
];

async function generateImage(filename: string, prompt: string) {
  console.log(`Generating ${filename}...`);
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to a valid model name if necessary, keeping original logic
      contents: [{
        role: 'user',
        parts: [{ text: prompt }]
      }]
    } as any); // Type cast to bypass strict typing for now if needed

    // Keeping original extraction logic
    let imageBase64 = null;
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageBase64 = part.inlineData.data;
          break;
        }
      }
    }

    if (imageBase64) {
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(path.join(assetsDir, filename), buffer);
      console.log(`Saved ${filename}`);
    } else {
      console.error(`Failed to generate image for ${filename}: No image data found in response.`);
    }
  } catch (error) {
    console.error(`Error generating ${filename}:`, error);
  }
}

async function main() {
  for (const img of imagesToGenerate) {
    await generateImage(img.name, img.prompt);
  }
}

main();
