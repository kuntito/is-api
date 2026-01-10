enum IdeaCategory {
    VISIONARY = "visionary",
    NORMIE = "normie",
    FOOL = "fool",
}
// "visionary, normie, fool"
const categoriesAsString = Object.values(IdeaCategory).join("\n");

const responses: Record<IdeaCategory, string[]> = {
    [IdeaCategory.VISIONARY]: [
        "you are who Elon thinks he is",
        "Visionary!!! \nElon who?",
        "there aren't many smarter than you",
    ],
    [IdeaCategory.NORMIE]: [
        "you're almost smart",
        "sounds like you have the Average Joe on speed dial",
        "you must be John Doe",
    ],
    [IdeaCategory.FOOL]: [
        "you are not a visionary",
        "there are definitely worse ideas",
        "success isn't for everyone",
    ],
};


const getIdeaJudgementPrompt = (idea: string): string => {
    const prompt = `
classify this author of this idea into exactly one of the following categories: 

${categoriesAsString}
    
first, categorize the idea. 

second, respond with one quip based on the category rules.
however, if idea doesn't sound like an app idea and sounds like rambling or something unrelated, insult the user at your discretion.

category rules:
1. Visionary - confident, reverent, glazing
   samples: ${responses[IdeaCategory.VISIONARY].join(", ")}


2. Normie - mildy condescending, cheeky
   samples: ${responses[IdeaCategory.NORMIE].join(", ")}

3. Fool - dismissive, dry, cutting but not cruel
   samples : ${responses[IdeaCategory.FOOL].join(", ")}

idea: ${idea}

only respond with the quip as a string, do not include the category.
`;


    return prompt;
};

export default getIdeaJudgementPrompt;
