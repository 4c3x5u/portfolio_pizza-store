import express from 'express';
import { body } from 'express-validator';

import { register, signIn, validateToken } from '../controllers/memberController';

const memberRouter = express.Router();

memberRouter.post('/register', [
  body('email')
    .isEmail()
    .withMessage('Invalid email.'),
  body('password')
    .isAscii()
    .isLength({ min: 8, max: 35 })
    .withMessage('Invalid password.'),
  body('passwordConfirmation')
    .isAscii()
    .isLength({ min: 8, max: 35 })
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password.');
      }
      return true;
    })
    .withMessage('Invalid password confirmation.'),
], register);

memberRouter.post('/sign-in', [
  body('email')
    .isEmail()
    .withMessage('Invalid email.'),
  body('password')
    .isLength({ min: 8, max: 35 })
    .isAscii()
    .withMessage('Invalid password.'),
], signIn);

memberRouter.post('/validate-token', [
  body('user')
    .not().isEmpty()
    .isHexadecimal()
    .withMessage('Invalid user.'),
  body('token')
    .not().isEmpty()
    .isAscii()
    .withMessage('Invalid token'),
], validateToken);

export default memberRouter;
