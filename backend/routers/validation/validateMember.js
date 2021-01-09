import { body } from 'express-validator';

const validateEmail = () => body('email')
  .not().isEmpty()
  .withMessage('Email must not be empty.')
  .isEmail()
  .withMessage('Email format is invalid.');

const validatePassword = () => body('password')
  .not().isEmpty()
  .withMessage('Password must not be empty.')
  .isAscii()
  .withMessage('Password contains invalid characters.')
  .isLength({ min: 8, max: 35 })
  .withMessage('Password must be 8 to 35 characters long.');

const validatePasswordConfirmation = () => body('passwordConfirmation')
  .not().isEmpty()
  .withMessage('Password confirmation must not be empty.')
  .isAscii()
  .withMessage('Password confirmation contains invalid characters.')
  .isLength({ min: 8, max: 35 })
  .withMessage('Password confirmation must be 8 to 35 characters long.')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password.');
    }
    return true;
  });

const validateUser = () => body('user')
  .not().isEmpty()
  .withMessage('User must not be empty')
  .isHexadecimal()
  .withMessage('User contains invalid characters.');

const validateToken = () => body('token')
  .not().isEmpty()
  .withMessage('Token must not be empty.')
  .isAscii()
  .withMessage('Token contains invalid characters.');

export default {
  email: validateEmail,
  password: validatePassword,
  passwordConfirmation: validatePasswordConfirmation,
  user: validateUser,
  token: validateToken,
};
