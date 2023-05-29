import express from "express";
import { verifyToken } from "../controllers/jwt/jwtAuth";
import * as  GameController from '../controllers/games'

const router = express.Router();

// router.get('/:gameId',verifyToken, GameController.getGame);
router.get('/:wordLength',verifyToken, GameController.getGame);

// router.post('/',verifyToken, GameController.createGame);

export default router;