import { NextFunction, Response } from 'express';
import GameModel from '../model/game'
import { assertIsDefined } from '../util/assertIsDefined';
import { UserRequest } from './types';
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { generateWord } from '../network/word';




// Get the Game 


export const getGame: any = async (req:UserRequest,res:Response,next:NextFunction) => {

    const authenticatedUserId = req.userId;

    try{
       assertIsDefined(authenticatedUserId); 

    //    if(!mongoose.isValidObjectId(gameId)){
    //         throw createHttpError(400,'Invalid game id');
    //     }
    
        const game = await GameModel.findOne({userId:authenticatedUserId,isActive:true}).exec();
        if(!game){
            throw createHttpError(404,'Game not found');
        }
        const word = game.word;
        const gameId = game.id;
        const gameWithWordAndId = { game, word ,gameId };
        res.status(200).json(gameWithWordAndId);
    }catch(error){
        next(error )
     
    }
};

// Create Game 

export const createGame:any = async (req:UserRequest,res:Response,next:NextFunction) => {

    const wordLength = req.params.wordLength;
    const authenticatedUserId = req.userId;
    const word = await generateWord(parseInt(wordLength));
    try{

        assertIsDefined(authenticatedUserId);
        if(!wordLength){
            throw createHttpError(400, 'You must select a wordLength')
        }

        const currentGame = await GameModel.findOne({userId:authenticatedUserId,isActive:true})
    
        if(currentGame){
            res.json('you can\'t start new game');
        }else{
            const newGame = await GameModel.create({
                userId:authenticatedUserId,
                wordLength:wordLength,
                word:word,
                currentWord:new Array(wordLength).fill(''),
                guesses:[],
               
        });
        res.status(201).json(newGame);
        }

    }catch(error){
        next(error);
    }
}

// Guess letter 

export const guessLetter:any = async (req:UserRequest,res:Response,next:NextFunction) => {
 
    const gameId = req.params.gameId;
    const letter = req.body.letter;  
    const authenticatedUserId = req.userId;


    try{

        assertIsDefined(authenticatedUserId);

        if(!mongoose.isValidObjectId(gameId)){
            throw createHttpError(400,'Invalid game id');
        }

        if (!letter){
            throw createHttpError(400,'You must enter a letter')
        }

        const game = await GameModel.findById(gameId).exec();

        if(!game){
            throw createHttpError("Game not Found");
        }

        if(!game.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You can't access this game")
        }

        let isWon = false;

                game.guesses.push(letter);
                game.isActive = game.remainingGuesses === 0 ? false : true;
                console.log(game.word)
                console.log(letter)

         if(game.word.toLocaleLowerCase().includes(letter?.toLocaleLowerCase())){
                   game.correctGuesses.push(letter)
                   for (let i = 0; i < game.word.length; i++) {
                        if (game.word[i] === letter) {
                          game.currentWord[i]= letter;

                        } 
                      }
                      console.log('----------' + game.currentWord)


                    } else {
            game.remainingGuesses = game.remainingGuesses - 1;
            game.incorrectGuesses.push(letter);
        }
        game.remainingGuesses === 0 ? game.isActive = false :game.isActive = true
        game.isActive = game.correctGuesses.length === game.word.length?false:true;     
        isWon = !game.isActive && game.correctGuesses.length === game.word.length;
        await game.save();
        res.json({ isWon, game });

    
    }catch(error){
        console.error(error)
    }
}