import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import MemberSchema from '../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

const saltRounds = 10;

// NOTE: THE PASSWORD FOR THE NEW MEMBER WAS NOT HASHED BEFORE SENDING TO DATABASE FOR SOME REASON

export const register = (req, res) => {
  const { email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, saltRounds, (err) => {
    if (err) { res.status(500).send(err); }
  });
  const newMember = new Member({
    email,
    password: hashPassword,
    pointsSpent: 0,
  });
  newMember.save((err, member) => (
    err ? res.status(400).send(err) : res.send(member)
  ));
};

export const login = async (req, res) => {
  Member.findOne({ email: req.body.email })
    .then((member, dbErr) => {
      if (dbErr) {
        res.status(400).send({ message: 'MongoDB: Something went wrong.' });
      } else if (!member) {
        res.status(400).send({ message: 'The email does not exist' });
      } else {
        bcrypt.compare(req.body.password, member.password, (hashErr, same) => {
          if (hashErr) {
            res.status(400).send(hashErr);
          } else if (!same) {
            res.status(400).send({ message: 'The password is invalid' });
          } else {
            res.send({ message: 'The username and password combination is CORRECT' });
          }
        });
      }
    });
};
