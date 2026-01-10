import grokClient from "../services/grokClient";
import getIdeaJudgementPrompt from "./getIdeaJudgementPrompt";


const getIdeaJudgement = async (idea: string) => {

    const role = "you are grok, a highly intelligent ai assistant that evaluates startup ideas.";
    const prompt = getIdeaJudgementPrompt(idea);

    const result = await grokClient.responses.create({
        model: "grok-4",
        input: [
            {
                role: "system",
                content: role,
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const output = result.output[0];

    // the response text is at `result.output[0].content[0].text`
    // Grok's typescript types don't expose this structure properly
    // so we manually check each level to keep typescript happy
    if ("content" in output && Array.isArray(output.content)) {
        const firstContent = output.content[0];
        if (firstContent && "text" in firstContent) {
            return firstContent.text;
        }
    }

    throw new Error("unexpected output format");
};

export default getIdeaJudgement;
