import mongoose from 'mongoose';

import registerController from './_register';
import loginController from './_login';
import validateTokenController from './_validateToken';
import MemberSchema from '../../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

export const register = registerController(Member);
export const login = loginController(Member);
export const validateToken = validateTokenController(Member);

// export const getMemberId = (req, res) => (
//   Member.findOne({ email: req.body.email })
//     .then((member, dbErr) => {
//       if (dbErr) {
//         res.status(400).send({ message: 'MongoDB: Something went wrong.' });
//       } else if (!member) {
//         res.status(400).send({ message: 'The email does not exist' });
//       } else {
//         res.send(member._id);
//       }
//     })
// );
