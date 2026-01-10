import { Request, Response, RequestHandler } from "express";
import OpenAI, { toFile } from "openai";
import { envConfig } from "../envConfig/.envConfig";
import transcribeAudio from "../helpers/transcribeAudio";
import getIdeaJudgement from "../helpers/getIdeaJudgement";


const openai = new OpenAI({ apiKey: envConfig.OPENAI_API_KEY });

// TODO error handling, large audio, limit user input
// TODO can we enforce data types, not sure what whisper ai receives
const uploadIdeaAudio: RequestHandler = async (req: Request, res: Response) => {
    const audioBuffer: Buffer = req.body;

    // TODO error handling..
    const transcribedText = await transcribeAudio(audioBuffer);
    const ideaJudgement = await getIdeaJudgement(transcribedText)


    res.json({
        success: true, // TODO error handling
        message: ideaJudgement
    });
};

export default uploadIdeaAudio;