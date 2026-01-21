const getClassifyTranscriptAsIdeaPrompt = (transcription: string) => {
    return `the text within quotes is the transcription of a voice recording.
    
    i asked the person who recorded this for their idea for a startup.
    i want you to classify the transcription into ONE of two categories.
    
    it's possible the recorder completely ignored me, 
    and said something unintelligible,
    said nothing, or are they're speech is incoherent.
    
    your job is to categorize the transcription as '1' or '0'
    
    '1' indicating there's a coherent idea for a startup within the text.
    '0' indicating there's not a coherent idea for a startup
    
    return '1' or return '0'
    do not return any other thing.
    
    the transcription is:
    "
    ${transcription}
    "`;
};

export default getClassifyTranscriptAsIdeaPrompt;
