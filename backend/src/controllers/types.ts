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
    userId: string,
    // wordLength: string,
}