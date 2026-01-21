import { RequestHandler, Request, Response } from "express";
import getAllTranscriptions from "../helpers/getAllTranscriptions";

const getTranscriptions: RequestHandler = async (req: Request, res: Response) => {
    try {
        const transcriptions = await getAllTranscriptions();
        return res.json({
            success: true,
            data: transcriptions,
        });

    } catch (e) {
        return res.json({
            success: false,
            message: `sumn' wrong, ${(e as Error).message}`
        })
    }
}

export default getTranscriptions;