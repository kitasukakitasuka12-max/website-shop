
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getGeminiResponse = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productContext = PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInput,
    config: {
      systemInstruction: `You are Lumina, a luxury AI personal stylist for the "Lumina Luxe" future-fashion shop. 
      You are elegant, professional, and slightly futuristic. 
      Recommend products from our catalog based on user needs. 
      Our current products:
      ${productContext}
      Keep responses concise and helpful. Use markdown for formatting.`,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  return response.text;
};
