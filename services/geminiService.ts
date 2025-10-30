import { GoogleGenAI } from "@google/genai";
import { timeToCatalan } from "../utils/timeToCatalan.ts";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is available.
  console.warn("API_KEY for Gemini is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getGeminiExplanation = async (hour: number, minute: number): Promise<string> => {
  if (!API_KEY) {
    return "La clau de l'API de Gemini no està configurada. No es pot obtenir una explicació.";
  }

  const timeString = timeToCatalan(hour, minute);
  const numericTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  const prompt = `
    Ets un professor de català amable i expert en ensenyar a dir l'hora.
    Explica de manera senzilla i clara, en català, per què l'hora ${numericTime} es diu "${timeString}".
    Enfoca't en el sistema de quarts.
    Fes una explicació breu, en un o dos paràgrafs curts.
    No utilitzis markdown, només text pla.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hi ha hagut un error en contactar amb l'assistent d'IA. Intenta-ho de nou més tard.";
  }
};