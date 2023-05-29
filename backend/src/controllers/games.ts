import { NextFunction, Response } from 'express';
import GameModel from '../model/game'
import { assertIsDefined } from '../util/assertIsDefined';
import { UserRequest } from './types';
import createHttpError from "http-errors";
import mongoose from "mongoose";



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
    // const word = req.body.word;
    // const guesses = req.body.guesses;
    // const correctGuesses = req.body.correctGuesses;
    // const incorrectGuesses = req.body.incorrectGuesses;
    // const remainingGuesses = req.body.remainingGuesses;
    // const isActive = req.body.isActive;

    try{

        assertIsDefined(authenticatedUserId);

        if(!wordLength){
            throw createHttpError(400, 'You must select a wordLength')
        }
        
        const newGame = await GameModel.create({
                // userId:authenticatedUserId,
                // wordLength:wordLength,
                // word:word,
                // guesses:guesses,
                // correctGuesses:correctGuesses,
                // incorrectGuesses:incorrectGuesses,
                // remainingGuesses:remainingGuesses,
                // isActive:true,
        });

        res.status(201).json(newGame); 

    }catch(error){
        next(error);
    }
}
