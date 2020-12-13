import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import MemberSchema from '../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

const saltRounds = 10;

export const register = (req, res) => {
  bcrypt.hashSync(req.body.password, saltRounds, (err, hashPassword) => {
    if (err) {
      res.status(500).send(err);
    } else {
      req.body.password = hashPassword;
    }
  });
  const newMember = new Member({
    ...req.body,
    pointsSpent: 0,
  });
  newMember.save((err, member) => (
    err ? res.send(err) : res.send(member)
  ));
};

export const login = async (req, res) => {
  try {
    const member = await Member.findOne({ email: req.body.email }).exec();
    if (!member) {
      return res.status(400).send({ message: 'The email does not exist.' });
    }
    if (!bcrypt.compareSync(req.body.password, member.password)) {
      return res.status(400).send({ message: 'The password is invalid.' });
    }
    return res.send({ message: 'The username and password combination is correct!' });
  } catch (error) {
    return res.status(500).send(error);
  }
};
