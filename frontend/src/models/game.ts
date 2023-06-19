export interface Game{
    _id: string,
    wordLength:string,
    word:string,
    guesses:string[],
    shownWord:string[],
    correctGuesses:string[],
    incorrectGuesses:string[],
    remainingGuesses:Number,
    isActive:Boolean,
}