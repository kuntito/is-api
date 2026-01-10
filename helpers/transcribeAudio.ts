import OpenAI, { toFile } from "openai";
import openaiClient from "../services/openaiClient";

const transcribeAudio = async (audioBuffer: Buffer): Promise<string> => {
    const transcription = await openaiClient.audio.transcriptions.create({
        file: await toFile(audioBuffer, "audio.mp3"),
        model: "whisper-1",
    });

    return transcription.text
}

export default transcribeAudio;