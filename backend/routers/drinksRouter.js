import express from 'express';
import {
  getAllDrinks,
  getDrinkById,
} from '../controllers/drinkController';

const drinksRouter = express.Router();

drinksRouter.get('/', getAllDrinks);
drinksRouter.get('/:drinkId', getDrinkById);

export default drinksRouter;
