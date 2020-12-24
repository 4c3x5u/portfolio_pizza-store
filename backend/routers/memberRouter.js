import express from 'express'
import { body } from 'express-validator'

import { register, login, validateToken } from '../controllers/memberController'

const memberRouter = express.Router()

memberRouter.post(
  '/register',
  [
    body('email', 'Invalid email.')
      .not().isEmpty()
      .isEmail(),
    body('password', 'Invalid password.')
      .not().isEmpty()
      .isLength({ min: 8, max: 35 })
      .isAscii(),
    body('passwordConfirmation', 'Invalid password confirmation.')
      .not().isEmpty()
      .isLength({ min: 8, max: 35 })
      .isAscii()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password.')
        }
        return true
      })
  ],
  register
)

memberRouter.post(
  '/login',
  [
    body('email')
      .not().isEmpty()
      .isEmail(),
    body('password')
      .not().isEmpty()
      .isLength({ min: 8, max: 35 })
      .isAscii()
  ],
  login
)

memberRouter.post(
  '/validateToken',
  [
    body('user')
      .not().isEmpty()
      .isHexadecimal(),
    body('token')
      .not().isEmpty()
      .isAscii()
  ],
  validateToken
)

export default memberRouter
