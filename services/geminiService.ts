import { GoogleGenAI } from "@google/genai";
import { timeToCatalan } from "../utils/timeToCatalan.ts";

// Aquesta funció obté la clau de l'API de manera segura sense trencar el navegador.
const getApiKey = (): string | undefined => {
  try {
    // Comprovem si 'process' i 'process.env' existeixen abans d'intentar accedir-hi.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
  } catch (e) {
    console.warn("No s'ha pogut accedir a process.env.API_KEY en aquest entorn.");
  }
  return undefined;
};

const API_KEY = getApiKey();
let ai: GoogleGenAI | null = null;

// Inicialitzem l'IA només si tenim una clau. Això evita errors en carregar la pàgina.
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("La clau de l'API de Gemini no està configurada. Les funcions d'IA estaran desactivades.");
}

export const getGeminiExplanation = async (hour: number, minute: number): Promise<string> => {
  // Comprovem la clau aquí, just abans de fer la trucada.
  if (!ai) {
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
