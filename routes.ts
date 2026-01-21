import express from "express";
import uploadIdeaAudio from "./request-handlers/uploadIdeaAudio";
import getTranscriptions from "./request-handlers/getTranscriptions";

const appRouter = express.Router();

appRouter.post(
    "/audio", 
    express.raw({ 
        type: ["audio/*", "video/webm"],
        limit: "10mb"
    }), 
    uploadIdeaAudio
);

appRouter.get("/transcriptions", getTranscriptions);

export default appRouter;