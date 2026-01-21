import { GoogleGenAI } from "@google/genai";
import { envConfig } from "../envConfig/.envConfig";

// const MODEL = "gemini-3-flash-preview";
export const GEMINI_MODEL = "gemini-3-pro-preview";

const geminiClient = new GoogleGenAI({ apiKey: envConfig.GEMINI_API_KEY });

export default geminiClient;
