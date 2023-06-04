import "dotenv/config"
import express, { Request,Response,NextFunction } from 'express';
import userRoutes from "./routes/users";
import createHttpError,{isHttpError} from "http-errors";
import morgan from 'morgan';
import { verifyToken } from "./controllers/jwt/jwtAuth";
import gameRoutes from './routes/games'


const app = express();
app.use(morgan('dev'));

app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/games',verifyToken,gameRoutes);


app.use((req,res,next) =>{
    next(createHttpError(404,'Endpoint not found'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error:unknown, req:Request, res:Response, next:NextFunction )=>{
    console.error(error);
    let errorMessage = 'An unknown error occurred'; 
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(500).json({error:errorMessage}); 

})

export default app; 