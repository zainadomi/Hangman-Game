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

    const gameId = req.params.gameId;
    const authenticatedUserId = req.userId;


    try{

        assertIsDefined(authenticatedUserId);
         
        if(!mongoose.isValidObjectId(gameId)){
            throw createHttpError(400,'Invalid game id');
        }
        const game = await GameModel.findById(gameId).exec();

        if(!game){
            throw createHttpError(404,'Game not found');
        }

        if(!game.userId.equals(authenticatedUserId)){
            throw createHttpError(401,"You can't access this game")
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
                guesses:[],
                // correctGuesses:[],
                // incorrectGuesses:[],
                // remainingGuesses:5,
                // isActive:true,
        });

        res.status(201).json(newGame.word); 

    }catch(error){
        next(error);
    }
}

// Guess letter 

export const guessLetter:any = async (req:UserRequest,res:Response,next:NextFunction) => {

    const {letter,id} = req.body;
    
    try{

        const game = await GameModel.findById(id).exec();
        if(!game){
            throw createHttpError("Game not found");
        }
        const word = game.word;
        const index = word.indexOf(letter);
        if (index == -1){
            game.incorrectGuesses.push(letter);
            game.remainingGuesses--;
        }else {
            game.correctGuesses.push(letter);
            const gameStatus = await game.save();
            const gameOver = gameStatus.remainingGuesses == 0;
            const winGame = gameStatus.correctGuesses.length == word.length;
            res.status(201).json({
                letter:letter,
                winGame:winGame,
                gameOver:gameOver,
            });
        }
    }catch(error){
        next(error);
    }
}