import grokClient from "../services/grokClient";
import getRoleAndPrompt from "./getRoleAndPrompt";


const getIdeaJudgement = async (idea: string) => {

    const {aiRole, prompt} = getRoleAndPrompt(idea);

    const result = await grokClient.responses.create({
        model: "grok-4",
        input: [
            {
                role: "system",
                content: aiRole,
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
