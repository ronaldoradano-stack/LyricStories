import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSongLyrics = async (mood: string): Promise<string> => {
  const prompt = `
    You are a soulful songwriter.
    The user is feeling: "${mood}".
    
    Write a rhyming couplet (exactly two lines) that captures this feeling.
    
    Rules:
    1. Output exactly two lines.
    2. Ensure the last line ends with a punctuation mark (., !, or ?).
    3. Do not cut off the sentence.
    4. Make it evocative.
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