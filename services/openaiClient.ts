import OpenAI from "openai";
import { envConfig } from "../envConfig/.envConfig";

const openaiClient = new OpenAI({
    apiKey: envConfig.OPENAI_API_KEY,
})

export default openaiClient;