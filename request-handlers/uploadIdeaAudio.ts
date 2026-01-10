import { Request, Response, RequestHandler } from "express";
import transcribeAudio from "../helpers/transcribeAudio";
import getIdeaJudgement from "../helpers/getIdeaJudgement";
import uploadTranscription from "../helpers/uploadTranscription";


// TODO large audio, limit user input, think api has 10MB limit
// TODO can we enforce data types, not sure what whisper ai receives
const uploadIdeaAudio: RequestHandler = async (req: Request, res: Response) => {
    const audioBuffer: Buffer = req.body;

    let transcribedText: string;
    try {
        transcribedText = await transcribeAudio(audioBuffer);
    } catch (error) {
        res.json({
            success: false,
            message: "Couldn't transcribe text"
        });
        return;
    }

    try {
        const [_, ideaJudgement] = await Promise.all([
            uploadTranscription(transcribedText),
            getIdeaJudgement(transcribedText)
        ]);

        res.json({
            success: true,
            message: ideaJudgement
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export default uploadIdeaAudio;