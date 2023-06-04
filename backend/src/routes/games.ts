import express from "express";
import { verifyToken } from "../controllers/jwt/jwtAuth";
import * as  GameController from '../controllers/games'

const router = express.Router();

// router.get('/:gameId',verifyToken, GameController.getGame);
// router.get('/:id',verifyToken, GameController.getGame);
// router.post('/',verifyToken, GameController.createGame);
router.post('/:wordLength', GameController.createGame);
router.post('/:letter', GameController.guessLetter);



export default router;