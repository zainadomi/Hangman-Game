
import {Game as GameModel} from '../models/game'
interface GameProps{
    game: GameModel
}

const Game = ({game}:GameProps) =>{
    const {
        word,
        wordLength,
        correctGuesses,
        incorrectGuesses,
        guesses,
        remainingGuesses,
        isActive,
    }= game;
}