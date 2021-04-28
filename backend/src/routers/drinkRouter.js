import express from 'express';
import { getDrinks } from '../controllers/drinkController';

const drinkRouter = express.Router();

drinkRouter.get('/', getDrinks);

export default drinkRouter;
