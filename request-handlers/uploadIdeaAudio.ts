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
        await uploadTranscription(transcribedText);
    } catch (error) {
        res.json({
            success: false,
            message: "Couldn't upload transcription"
        });
        return;
    }


    let ideaJudgement: string;
    try {
        ideaJudgement = await getIdeaJudgement(transcribedText);
    } catch (error) {
        res.json({
            success: false,
            message: "Couldn't judge idea"
        });
        return;
    }

    res.json({
        success: true,
        message: ideaJudgement
    });
};

export default uploadIdeaAudio;