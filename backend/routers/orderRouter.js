import express from 'express';

import validate from './validation/validateOrder';
import { submitOrder, getHistory } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', [
  validate.memberId(),
  validate.paymentDetails.cardNumber(),
  validate.paymentDetails.expiryDate(),
  validate.paymentDetails.securityCode(),
  validate.address.postcode(),
  validate.address.firstLine(),
  validate.address.secondLine(),
  validate.phoneNumber(),
], submitOrder);

orderRouter.get('/history/:memberId', [validate.param.memberId()], getHistory);

export default orderRouter;
