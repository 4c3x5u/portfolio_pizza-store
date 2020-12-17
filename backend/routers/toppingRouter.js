import express from 'express';
import {
  getToppings,
  getToppingById,
} from '../controllers/toppingController';

const toppingRouter = express.Router();

toppingRouter.get('/', getToppings);
toppingRouter.get('/:toppingId', getToppingById);

export default toppingRouter;
