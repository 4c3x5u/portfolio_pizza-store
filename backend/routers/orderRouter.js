import express from 'express';
import { body, param } from 'express-validator';

import { submitOrder, getHistory } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', [
  body('paymentDetails.cardNumber')
    .isCreditCard(),
  body('paymentDetails.expiryDate')
    .custom((value, { req }) => {
      if (!/^\d{2}\/\d{2,4}$/g.test(req.body.paymentDetails.expiryDate)) {
        throw new Error('Invalid expiry date.');
      } else {
        return value;
      }
    }),
  body('paymentDetails.securityCode')
    .isNumeric({ no_symbols: true })
    .isLength({ min: 3, max: 4 }),
  body('address.postcode')
    .isPostalCode('GB'),
  body('address.firstLine')
    .isAscii()
    .isLength({ min: 7, max: 25 }),
  body('address.secondLine')
    .isAscii()
    .isLength({ min: 7, max: 25 }),
  body('phoneNumber')
    .isMobilePhone('any'),
], submitOrder);

orderRouter.get('/history/:memberId', [
  param('memberId')
    .not().isEmpty()
    .isHexadecimal(),
], getHistory);

export default orderRouter;
