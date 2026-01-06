
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from "../constants";

export const getGeminiResponse = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const productContext = PRODUCTS.map(p => `- ${p.name} (Rp ${p.price.toLocaleString('id-ID')}): ${p.description}`).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: userInput,
    config: {
      systemInstruction: `Anda adalah Lumina, asisten gaya pribadi AI mewah untuk toko fashion masa depan "Lumina Luxe". 
      Anda elegan, profesional, dan sedikit futuristik. 
      Berikan rekomendasi produk dari katalog kami berdasarkan kebutuhan pengguna. 
      Gunakan Bahasa Indonesia yang sopan namun modern.
      Daftar produk kami saat ini:
      ${productContext}
      Buat respon yang singkat, membantu, dan gunakan markdown untuk format teks.`,
      temperature: 0.7,
      maxOutputTokens: 500,
    },
  });

  return response.text;
};
