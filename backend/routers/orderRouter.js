import express from 'express';
import { body, param } from 'express-validator';

import { submitOrder, getHistory } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post('/', [
  body('paymentDetails.cardNumber')
    .isCreditCard()
    .withMessage('Invalid card number.'),
  body('paymentDetails.expiryDate')
    .custom((value, { req }) => {
      if (!/^\d{2}\/\d{2,4}$/g.test(req.body.paymentDetails.expiryDate)) {
        throw new Error('Invalid expiry date.');
      } else {
        return value;
      }
    })
    .withMessage('Invalid expiry date.'),
  body('paymentDetails.securityCode')
    .isNumeric({ no_symbols: true })
    .isLength({ min: 3, max: 4 })
    .withMessage('Invalid security code.'),
  body('address.postcode')
    .isPostalCode('GB')
    .withMessage('Invalid postcode.'),
  body('address.firstLine')
    .isAscii()
    .isLength({ min: 7, max: 25 })
    .withMessage('Invalid first line of address.'),
  body('address.secondLine')
    .isAscii()
    .isLength({ min: 7, max: 25 })
    .withMessage('Invalid second line of address.'),
  body('phoneNumber')
    .isMobilePhone('any')
    .withMessage('Invalid phone number.'),
], submitOrder);

orderRouter.get('/history/:memberId', [
  param('memberId')
    .not().isEmpty()
    .isHexadecimal()
    .withMessage('Invalid member ID.'),
], getHistory);

export default orderRouter;
