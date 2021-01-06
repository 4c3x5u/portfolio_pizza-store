import express from 'express';
import {
  getDrinks,
  getDrinkById,
  postDrinks,
} from '../controllers/drinkController';

const drinkRouter = express.Router();

drinkRouter.get('/', getDrinks);
drinkRouter.post('/', postDrinks);
drinkRouter.get('/:drinkId', getDrinkById);

export default drinkRouter;
