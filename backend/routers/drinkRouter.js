import express from 'express'
import {
  getAllDrinks,
  getDrinkById,
  postDrinks
} from '../controllers/drinkController'

const drinkRouter = express.Router()

drinkRouter.get('/', getAllDrinks)
drinkRouter.post('/', postDrinks)
drinkRouter.get('/:drinkId', getDrinkById)

export default drinkRouter
