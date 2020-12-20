import express from 'express'
import { submitOrder, getHistory } from '../controllers/orderController'

const orderRouter = express.Router()

orderRouter.post('/', submitOrder)

orderRouter.get('/history/:memberId', getHistory)

export default orderRouter
