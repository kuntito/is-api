import { Request, Response, RequestHandler } from "express";

// TODO error handling, large audio, limit user input
const uploadIdeaAudio: RequestHandler = async(req: Request, res: Response) => {
    const audioBuffer = req.body;

    res.json({
      received: true,
      size: audioBuffer.length
    });
}

export default uploadIdeaAudio;