import express from 'express';
import {
  getAllDrinks,
  getDrinkById,
} from '../controllers/drinkController';

const drinkRouter = express.Router();

drinkRouter.get('/', getAllDrinks);
drinkRouter.get('/:drinkId', getDrinkById);

export default drinkRouter;
