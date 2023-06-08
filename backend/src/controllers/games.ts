import { NextFunction, Response } from 'express';
import GameModel from '../model/game'
import { assertIsDefined } from '../util/assertIsDefined';
import { UserRequest } from './types';
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { generateWord } from '../network/word';



// Get Game

// import { NextFunction, Response } from "express";
// import { assertIsDefined } from "../util/assertIsDefined";
// import { UserRequest } from "./types";

// export const getGame:any = async (req:UserRequest,res:Response,next:NextFunction)=>{
//     const authenticatedUserId = req.userId;

//     try {
//         assertIsDefined(authenticatedUserId)
//         const game = await GameModel.find({userId:authenticatedUserId}).exec();
//         res.status(200).json(game);
//     } catch (error) {
//         next(error)
//     }
// } 

// Get the Game 


export const getGame: any = async (req:UserRequest,res:Response,next:NextFunction) => {

    // const gameId = req.params.gameId;
    const authenticatedUserId = req.userId;

    try{
       assertIsDefined(authenticatedUserId); 

    //    if(!mongoose.isValidObjectId(gameId)){
    //         throw createHttpError(400,'Invalid game id');
    //     }
        const game = await GameModel.find({userId:authenticatedUserId,isActive:true}).exec();

        if(!game){
            throw createHttpError(404,'Game not found');
        }

        res.status(200).json(game);
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

        const newGame = await GameModel.create({
                userId:authenticatedUserId,
                wordLength:wordLength,
                word:word,
                currentWord:new Array(wordLength).fill(''),
                guesses:[],
               
        });

        res.status(201).json(newGame); // .word

    }catch(error){
        next(error);
    }
}

// Guess letter 

export const guessLetter:any = async (req:UserRequest,res:Response,next:NextFunction) => {
 
    // function replaceLetterAtIndex(word: string, index: number, newLetter: string): string {
    //     const wordArray = Array.from(word); 
    //     wordArray[index] = newLetter; 
    //     return wordArray.join(''); 
    //   }

    // const {letter,id, isActive} = req.body;
    
    // try {
    //     const game = await GameModel.findById(id, isActive.true).exec();
    //     if (!game) {
    //       throw createHttpError("Game not found");
    //     }
    //     let word = game.word;
    
    //     const isLetterInWord = word.includes(letter);
    //     console.log(`Is letter "${letter}" in the word? ${isLetterInWord}`);
    
    //     if (isLetterInWord) {
    //       const indices = [];
    //       for (let i = 0; i < word.length; i++) {
    //         if (word[i] === letter) {
    //           indices.push(i);
    //         }
    //       }
    
    //       for (const index of indices) {
    //         word = replaceLetterAtIndex(word, index, letter);
    //       } // don't need it
    //     }
    
    //     console.log(`Updated word: ${word}`);
    // }catch(error){
    //     next(error);
    // }
    // new finction 

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
        isWon = !game.isActive && game.correctGuesses.length === game.word.length;
        await game.save();
        res.json({ isWon, game });

    
    }catch(error){
        console.error(error)
    }
}