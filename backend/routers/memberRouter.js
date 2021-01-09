import express from 'express';

import { register, signIn, validateToken } from '../controllers/memberController';
import validateMember from './validation/validateMember';

const memberRouter = express.Router();

memberRouter.post('/register', [
  validateMember.email(),
  validateMember.password(),
  validateMember.passwordConfirmation(),
], register);

memberRouter.post('/sign-in', [
  validateMember.email(),
  validateMember.password(),
], signIn);

memberRouter.post('/validate-token', [
  validateMember.user(),
  validateMember.token(),
], validateToken);

export default memberRouter;
