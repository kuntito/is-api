import e from "express";
import execGeminiPrompt from "./execGeminiPrompt";
import getClassifyTranscriptAsIdeaPrompt from "../prompts/getClassifyTranscriptAsIdeaPrompt";

/**
 * determines if audio transcription contains a coherent startup idea.
 * uses gemini AI to classify transcription as idea (true), non-idea (false),
 * or unclassifiable (undefined).
 *
 * @param transcription - text from voice recording
 * @returns true if coherent startup idea detected, false if not, undefined if something goes wrong.
 */
const isTranscriptionIdea = async (
    transcription: string
): Promise<Boolean | undefined> => {
    const prompt = getClassifyTranscriptAsIdeaPrompt(transcription);

    const { success: succeeds, message } = await execGeminiPrompt(prompt);
    if (!succeeds) {
        console.log(`couldn't classify transcription, ${message}`);
    }

    if (message == "1") {
        return true;
    } else if (message == "0") {
        return false;
    } else {
        undefined;
    }
};

export default isTranscriptionIdea;
