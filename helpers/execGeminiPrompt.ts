import geminiClient, { GEMINI_MODEL } from "../services/geminiClient";
import { BasicApiResponse } from "../types/BasicApiResponse";

const execGeminiPrompt = async (prompt: string): Promise<BasicApiResponse> => {
    try {
        const response = await geminiClient.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        if (response.text === undefined) {
            throw new Error("response text is undefined");
        }

        return {
            success: true,
            message: response.text,
        };
    } catch (e) {
        return {
            success: false,
            message: `error occurred, ${(e as Error).message}`,
        };
    }
};

export default execGeminiPrompt;