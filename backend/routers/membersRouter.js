import express from 'express';
import {
  register,
  login,
  validateToken,
} from '../controllers/memberController';

const membersRouter = express.Router();

membersRouter.post('/register', register);
membersRouter.post('/login', login);
membersRouter.post('/validateToken', validateToken);

export default membersRouter;
