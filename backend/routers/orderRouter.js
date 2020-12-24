import express from 'express'
import { body } from 'express-validator'

import { submitOrder, getHistory } from '../controllers/orderController'

const orderRouter = express.Router()

orderRouter.post(
  '/',
  [
    body('paymentDetails.cardNumber')
      .isCreditCard(),
    body('paymentDetails.expiryDate')
      .custom((value, { req }) => {
        if (!/^\d{2}\/\d{2,4}$/g.test(req.body.paymentDetails.expiryDate)) {
          throw new Error('Invalid expiry date.')
        } else {
          return value
        }
      }),
    body('phoneNumber')
      .isMobilePhone('any')
  ],
  submitOrder)

orderRouter.get('/history/:memberId', getHistory)

export default orderRouter
