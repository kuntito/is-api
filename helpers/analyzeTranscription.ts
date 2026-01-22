import isTranscriptionIdea from "./isTranscriptionIdea";
import judgeUserIdea from "./judgeUserIdea";
import roastUser, { roastVerdictType } from "./roastUser";

// the frontend displays different animations
// based on the what the backend returns

// so far, there's support for two scenarios..
// a good idea or a bad one..
// but there's also the scenario where the user says pure garbage

export type IdeaVerdict = "VISIONARY" | "DELUSIONAL";
type VerdictType = IdeaVerdict | roastVerdictType;

export interface TranscriptionResult {
    verdictType: VerdictType | null;
    verdictText: string | null;
}

const analyzeTranscription = async (
    transcribedText: string
): Promise<TranscriptionResult> => {
    const isIdea = await isTranscriptionIdea(transcribedText);

    // what's the plan here, if it's an idea, we'd analyze, the prompt
    // returns visionary or delusional as verdict types..
    if (isIdea) {
        return judgeUserIdea(transcribedText);
    } else if (isIdea == undefined) {
        // if the classification fails, i.e. undefined
        // what do you want to do..
        // for now, i'd treat it as an idea..
        return judgeUserIdea(transcribedText);
    } else {
        // if it's not an idea, i.e. false, the verdict type is garbage..
        // and we roast the person accordingly..
        return roastUser(transcribedText);
    }
};

export default analyzeTranscription;
