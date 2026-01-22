import grokClient, { GROK_MODEL } from "../services/grokClient";
import { BasicApiResponse } from "../types/BasicApiResponse";

// TODO should this be with the grok client?
const execGrokPrompt = async (role: string, prompt: string): Promise<BasicApiResponse> => {


    // TODO regex to ensure the response is what i want
    // since i'd be splitting based on '&'
    const result = await grokClient.responses.create({
        model: GROK_MODEL,
        input: [
            {
                role: "system",
                content: role
            },
            {
                role: "user",
                content: prompt,
            }
        ],
    })

    const output = result.output[0];

    let promptResponse: string | undefined;

    // the response text is at `result.output[0].content[0].text`
    // Grok's typescript types don't expose this structure properly
    // so we manually check each level to keep typescript happy
    if ("content" in output && Array.isArray(output.content)) {
        const firstContent = output.content[0];
        if (firstContent && "text" in firstContent) {
            promptResponse = firstContent.text;
        }
    }

    if (!promptResponse) {
        return {
            success: false,
            message: "failed to retrieve text response"
        }
    }

    return {
        success: true,
        message: promptResponse,
    }

}

export default execGrokPrompt;