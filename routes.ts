import express from "express";
import uploadIdeaAudio from "./request-handlers/uploadIdeaAudio";

const appRouter = express.Router();

appRouter.post("/idea-audio", uploadIdeaAudio);

export default appRouter;