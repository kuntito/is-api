import getRoastUserPrompt from "../prompts/getRoastUserPrompt";
import { TranscriptionResult } from "./analyzeTranscription";
import execGrokPrompt from "./execGrokPrompt";

export type roastVerdictType = "GARBAGE";

const roastUser = async (usersWords: string): Promise<TranscriptionResult> => {
    const aiRole = "you're a harsh critic, concise but biting, and you're judging pre-recorded start up ideas.";

    const roastUserPrompt = getRoastUserPrompt(usersWords);

    const { success, message: roast } = await execGrokPrompt(aiRole, roastUserPrompt);

    if (!success || !roast) {
        return {
            verdictType: null,
            verdictText: null,
        };
    }


    return {
        verdictType: "GARBAGE",
        verdictText: roast,
    };
};

export default roastUser;