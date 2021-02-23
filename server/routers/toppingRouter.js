import express from 'express';
import { getToppings } from '../controllers/toppingController';

const toppingRouter = express.Router();

toppingRouter.get('/', getToppings);

export default toppingRouter;
