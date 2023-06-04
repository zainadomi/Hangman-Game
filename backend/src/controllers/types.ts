import { Request } from "express";


export interface SignUpBody extends Request{

    username?: string,
    email?:string,
    password?: string,

}

export interface LoginBody extends Request{

    username?: string,
    password?: string
}

export interface UserRequest extends Request {
    userId:string,
    wordLength:string,
    word:string,
    guesses:string[],
    correctGuesses:string[],
    incorrectGuesses:string[],
    remainingGuesses:number,
    isActive:boolean,
}