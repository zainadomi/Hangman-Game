import {InferSchemaType, Schema,model} from "mongoose";

const gameSchema  = new Schema({

    userId:{type: Schema.Types.ObjectId, required:true},
    wordLength:{type:Number,required:true},
    word:{type:String,required:true},
    letter:{type:String},
    shownWord:{type:[String],default:[]},
    guesses:{type:[String],}, 
    correctGuesses:{type: [String]},
    incorrectGuesses:{type: [String]},     
    remainingGuesses:{type: Number,default:10},
    isActive:{type: Boolean, default:true},
});

type Game = InferSchemaType<typeof gameSchema>;

export default model<Game>("Game" ,gameSchema)