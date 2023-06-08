import express from "express";
import { verifyToken } from "../controllers/jwt/jwtAuth";
import * as  GameController from '../controllers/games'

const router = express.Router();

router.get('/',verifyToken, GameController.getGame); // /getGame/:gameId
// router.get('/:id',verifyToken, GameController.getGame);
// router.post('/',verifyToken, GameController.createGame);
router.post('/:wordLength',verifyToken, GameController.createGame);
router.post('/guessLetter/game/:gameId', GameController.guessLetter);



export default router;