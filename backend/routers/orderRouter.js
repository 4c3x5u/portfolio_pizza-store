import express from 'express'
import submit from '../controllers/orderController'

const orderRouter = express.Router()

orderRouter.post('/', submit)

export default orderRouter
