import { Request, Response, RequestHandler } from "express";
import transcribeAudio from "../helpers/transcribeAudio";
import getIdeaJudgement from "../helpers/getIdeaJudgement";
import uploadTranscription from "../helpers/uploadTranscription";


// TODO large audio, limit user input, think api has 10MB limit
const uploadIdeaAudio: RequestHandler = async (req: Request, res: Response) => {
    const audioBuffer: Buffer = req.body;
    const contentType = req.get("Content-Type");
    const fileExt = getExtensionFromContentType(contentType);

    console.log("audioBuffer:", audioBuffer);
    let transcribedText: string;
    try {
        transcribedText = await transcribeAudio(audioBuffer, fileExt);
    } catch (err) {
        res.json({
            success: false,
            message: "Couldn't transcribe text",
            debug: { contentType, fileExt }
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

const getExtensionFromContentType = (contentType?: string): string => {
    if (!contentType) return "";

    const subtype = contentType.split('/')[1];

    // content-type can include parameters after semicolon
    // e.g., 'audio/mpeg; charset=utf-8' or 'text/html; boundary=something'
    // split(';')[0] removes parameters, keeps just the subtype
    return subtype?.split(';')[0] || "";
}