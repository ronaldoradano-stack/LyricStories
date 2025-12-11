import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing. Make sure it is set in your Vercel Environment Variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-to-prevent-crash' });

export const generateSongLyrics = async (mood: string, style: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("API configuration is missing.");
  }

  // Persona instructions based on style
  let styleInstruction = "";
  switch (style) {
    case 'Rap':
      styleInstruction = "Write in a Rap style. Use internal rhymes, flow, slang, and a confident or gritty tone. Make it rhythmic.";
      break;
    case 'Rock':
      styleInstruction = "Write in a Rock style. Use energetic, raw, or rebellious language. Make it sound powerful and edgy.";
      break;
    case 'Country':
      styleInstruction = "Write in a Country music style. Use simple, storytelling language. Mention tangible things (roads, heart, home, rain).";
      break;
    case 'R&B':
      styleInstruction = "Write in a smooth R&B style. Focus on emotion, soul, and interpersonal connection. Make it smooth.";
      break;
    case 'Pop':
    default:
      styleInstruction = "Write in a Modern Pop style. Use catchy, conversational, and relatable language. Sound like a current radio hit.";
      break;
  }

  const prompt = `
    You are a hit songwriter.
    The user is feeling: "${mood}".
    
    Task: Write a rhyming couplet (exactly two lines) that captures this feeling.
    
    Style: ${styleInstruction}
    
    CRITICAL RULES:
    1. Output exactly two lines.
    2. Use MODERN, conversational English. 
    3. DO NOT use archaic, "poetic" words like "whispering winds", "souls", "entwined", "beseech", or "realm". 
    4. Write lyrics that a real 2025 artist would sing, not a poem.
    5. Ensure the last line ends with a punctuation mark (., !, or ?).
    6. Do not cut off the sentence.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
      }
    });

    if (response.text) {
      return response.text.trim();
    }
    throw new Error("No text generated");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};