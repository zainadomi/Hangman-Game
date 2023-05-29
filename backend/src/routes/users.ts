import express from 'express';
import { verifyToken } from '../controllers/jwt/jwtAuth';
import * as UsersController from '../controllers/users';

const router = express.Router();

router.get('/',verifyToken,UsersController.getAuthenticatedUser);
router.post('/signup', UsersController.signUp);
router.post('/login', UsersController.login);
router.post('/logout',UsersController.logout);


export default router; 