import {InferSchemaType, Schema,model} from "mongoose";

const gameSchema  = new Schema({

    userId:{type: Schema.Types.ObjectId, required:true},
    wordLength:{type:String,required:true},
    word:{type:String,required:true},
    guesses:{type:String,}, // everything
    correctGuesses:{type: [String]},// array 
    incorrectGuesses:{type: [String]}, // array     
    remainingGuesses:{type: Number,default:5},
    isActive:{type: Boolean},
});

type Game = InferSchemaType<typeof gameSchema>;

export default model<Game>("Game" ,gameSchema)