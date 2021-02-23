import express from 'express';
import { getSides } from '../controllers/sideController';

const sideRouter = express.Router();

sideRouter.get('/', getSides);

export default sideRouter;
