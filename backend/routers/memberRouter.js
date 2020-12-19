import express from 'express'
import {
  register,
  login,
  validateToken
} from '../controllers/memberController'

const memberRouter = express.Router()

memberRouter.post('/register', register)
memberRouter.post('/login', login)
memberRouter.post('/validateToken', validateToken)

export default memberRouter
