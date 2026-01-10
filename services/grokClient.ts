import ms from 'ms';
import OpenAI from 'openai';
import { envConfig } from '../envConfig/.envConfig';

const grokClient = new OpenAI({
    apiKey: envConfig.GROK_API_KEY,
    baseURL: "https://api.x.ai/v1",
    timeout: ms("6m"), // Override default timeout with longer timeout for reasoning models
});

export default grokClient;