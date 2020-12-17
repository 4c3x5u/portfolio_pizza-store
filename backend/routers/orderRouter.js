import express from 'express';
import { submitOrder } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', submitOrder);

export default orderRouter;
