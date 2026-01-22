import { Request, Response, RequestHandler } from "express";
import transcribeAudio from "../helpers/transcribeAudio";
import uploadTranscription from "../helpers/uploadTranscription";
import analyzeTranscription, { TranscriptionResult } from "../helpers/analyzeTranscription";


interface IdeaAnalysisResponse {
    success: boolean,
    debug?: object,
    transcriptionResult?: TranscriptionResult;
}

// TODO large audio, limit user input, think api has 10MB limit
const uploadIdeaAudio: RequestHandler = async (
    req: Request,
    res: Response<IdeaAnalysisResponse>
) => {
    const audioBuffer: Buffer = req.body;
    const contentType = req.get("Content-Type");
    const fileExt = getExtensionFromContentType(contentType);

    let transcribedText: string;
    try {
        transcribedText = await transcribeAudio(audioBuffer, fileExt);
    } catch (e) {
        res.json({
            success: false,
            debug: { 
                errorMessage: `${(e as Error).message}`,
                contentType: contentType,
                fileExt: fileExt 
            }
        });
        return;
    }

    try {
        const [_, transcriptionResult] = await Promise.all([
            uploadTranscription(transcribedText),
            analyzeTranscription(transcribedText),
        ]);

        res.json({
            success: true,
            transcriptionResult: transcriptionResult
        });
    } catch (e) {
        res.json({
            success: false,
            debug: {
                errorMessage: `${(e as Error).message}`
            }
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