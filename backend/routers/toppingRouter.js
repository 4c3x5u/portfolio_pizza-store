import express from 'express';
import {
  getToppings,
  getToppingById,
  postToppings,
} from '../controllers/toppingController';

const toppingRouter = express.Router();

toppingRouter.get('/', getToppings);
toppingRouter.post('/', postToppings);
toppingRouter.get('/:toppingId', getToppingById);

export default toppingRouter;
