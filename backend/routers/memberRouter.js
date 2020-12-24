import express from 'express'
import { body } from 'express-validator'

import { register, login, validateToken } from '../controllers/memberController'

const memberRouter = express.Router()

memberRouter.post(
  '/register',
  [
    body('email', 'Invalid email.')
      .isEmail(),
    body('password', 'Invalid password.')
      .isAscii()
      .isLength({ min: 8, max: 35 }),
    body('passwordConfirmation', 'Invalid password confirmation.')
      .isAscii()
      .isLength({ min: 8, max: 35 })
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
      .isEmail(),
    body('password')
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
