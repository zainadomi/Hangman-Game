export interface Game{
    wordLength:string,
    word:string,
    guesses:string[],
    correctGuesses:string[],
    incorrectGuesses:string[],
    remainingGuesses:string[],
    isActive:Boolean,
}