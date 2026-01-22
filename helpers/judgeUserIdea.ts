import getJudgeIdeaPrompt from "../prompts/getJudgeIdeaPrompt";
import { TranscriptionResult } from "./analyzeTranscription";
import execGrokPrompt from "./execGrokPrompt";

const judgeUserIdea = async (idea: string): Promise<TranscriptionResult> => {
    const aiRole =
        "you evaluate startup ideas based on their merit. if they merit, praise the founder, if they don't merit, roast the founder, let the roasting be tied to the idea.";

    const {prompt: judgeIdeaPrompt, parseResponse} = getJudgeIdeaPrompt(idea);

    const { success, message } = await execGrokPrompt(aiRole, judgeIdeaPrompt);
    
    if (!success || !message) {
        return {
            verdictType: null,
            verdictText: null,
        };
    }
    
    const {verdictType, verdictText} = parseResponse(message)

    return {
        verdictType: verdictType,
        verdictText: verdictText,
    };
};

export default judgeUserIdea;

