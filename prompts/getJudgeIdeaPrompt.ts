import { IdeaVerdict } from "../helpers/analyzeTranscription"

// i'm adding this here, since `IdeaVerdict` is the source of truth
// if we change the values, i want the prompt to break
const ideaVerdictLiterals: IdeaVerdict[] = [
    "VISIONARY", 
    "DELUSIONAL"
];

interface JudgeIdeaPromptResult {
    prompt: string;
    parseResponse: (response: string) => {
        verdictType: IdeaVerdict;
        verdictText: string;
    }
}

const RESPONSE_DELIMITER = '&';
/**
 * generates prompt for AI to judge a startup idea.
 * 
 * the prompt returns two values:
 * - verdictType: classification of idea quality (VISIONARY or DELUSIONAL), based on the file type `IdeaVerdict`
 * - verdictText: AI's quip about the idea
 * 
 * sample response: 'VISIONARY&your plan to build a wall looks solid'
 * 
 * the delimiter is '&' 
 * it's declared within this file as `RESPONSE_DELIMITER`.
 * 
 * the prompt is a black box and can change, but output remains the same, 
 * `verdictType` and `verdictText`.
 * 
 * hence, the `parseResponse` function helps to extract the values safely.
 * 
 * @param idea - start up idea
 * @returns object containing prompt string and parseResponse helper function
 * 
 * @example
 * const { prompt, parseResponse } = getJudgeIdeaPrompt("uber but with blunts");
 * const aiResponse = await callAI(prompt);
 * const { verdictType, verdictText } = parseResponse(aiResponse);
 */
const getJudgeIdeaPrompt = (idea: string): JudgeIdeaPromptResult => {
    const prompt = `the text within quotes is a transcript of someone's voice recording.

    they were asked to record their idea for a start up and this is what they came up with.

    i want you classify their idea as ${ideaVerdictLiterals.join(" or ")}

    after classification, you want to respond with a quip. the quip should be based on the idea.

    say, someone says, they want to start an uber like business but the car comes with a pre-rolled blunt. this would fall in the delusional category.

    and the quip could be, "even if this wasn't illegal? doesn't common sense tell you otherwise"

    you want to tie the quip to the idea. a critic of the idea but a tad insulting.

    say, someone says, they want to build an app, that takes a job description, allows people voice record their job experiences, and generates a relevant resume.

    this would fall in the visionary category.

    and the quip could be, "even Elon couldn't come up with this"

    you don't want to use these precise examples, come up with yours. they're simply a guide for what the response could look like.

    your response is a string. two values separated by '${RESPONSE_DELIMITER}', the idea classification and the quip.

    for example:

    VISIONARY${RESPONSE_DELIMITER}very few can compete on your level
    DELUSIONAL${RESPONSE_DELIMITER}to say your idea is stupid is an overstatement

    the idea you want to judge is "${idea}"
    `;

    const parseResponse = (response: string) => {
        const [verdictType, verdictText] = response.split(RESPONSE_DELIMITER);

        return {
            verdictType: verdictType.trim() as IdeaVerdict,
            verdictText: verdictText.trim(),
        }
    }

    return { prompt, parseResponse };

}

export default getJudgeIdeaPrompt;