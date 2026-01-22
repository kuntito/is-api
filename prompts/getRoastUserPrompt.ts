const getRoastUserPrompt = (transcription: string): string => {
    return `the text within quotes is a transcript of someone's voice recording.
    
    i asked them to record their idea for a start up and they've clearly missed the plot.
    
    your job is to roast them accordingly.

    the transcription could be an empty string, indicating the person said nothing

    or the transcription could contain something unintelligible, perhaps, they were rambling about something unrelated or they couldn't string together a basic sentence.

    whatever it is, roast accordingly. 
    
    the transcript is meant to be in english, if it isn't in english, roast accordingly.

    you want to keep your roast concise, crisp but biting.

    some sample roasts are:

    if missing the point was a skill, you'd be Michael Jordan, or,
    you might need a therapist? tried better welp?, or,
    this sounds like it should be on a podcast.

    these examples are not meant to be used verbatim, they're simply a guide for what the response could look like.
    aim for 15 words at most, but with British subtlety.

    it could be as simple as: what are you even talking about?

    to aid concision, you don't have to address the entire transcript, just the most salient point.

    the transcript you want to roast is ${transcription}
    `;
}

export default getRoastUserPrompt;