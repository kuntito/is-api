import express from "express";
import uploadIdeaAudio from "./request-handlers/uploadIdeaAudio";

const appRouter = express.Router();

appRouter.post(
    "/audio", 
    express.raw({ 
        type: ["audio/*", "video/webm"],
        limit: "10mb"
    }), 
    uploadIdeaAudio
);

export default appRouter;