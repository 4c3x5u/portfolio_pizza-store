import mongoose from 'mongoose';

import registerController from './_register';
import loginController from './_login';
import validateTokenController from './_validateToken';
import MemberSchema from '../../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

export const register = registerController(Member);
export const login = loginController(Member);
export const validateToken = validateTokenController(Member);
