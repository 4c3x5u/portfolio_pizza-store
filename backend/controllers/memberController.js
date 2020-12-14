import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import MemberSchema from '../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

const saltRounds = 10;

export const register = (req, res) => {
  if (req.body.password === req.body.passwordConfirmation) {
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, (hashErr, hashPassword) => {
      if (hashErr) { res.status(500).send(hashErr); }
      const newMember = new Member({
        email,
        password: hashPassword,
        pointsSpent: 0,
      });
      newMember.save((dbErr, member) => (
        dbErr ? (
          res.status(400).send(dbErr)
        ) : (
          res.send({ user: member.email, token: member.password })
        )
      ));
    });
  } else {
    res.status(400).send({
      message: 'The password confirmation do not match the password.',
    });
  }
};

export const login = async (req, res) => (
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
            res.send({ user: req.body.email, token: member.password });
          }
        });
      }
    })
);

export const validateToken = (req, res) => {
  console.log(req.body.user);
  Member.findOne({ email: req.body.user })
    .then((member, err) => {
      if (err) { res.status(400).send({ message: 'Token validation failed. (1)' }); }
      if (!member) { res.status(400).send({ message: 'Token validation failed. (2)' }); }
      if (member.password !== req.body.token) { res.status(400).send({ message: 'Token validation failed. (3)' }); }
      res.send({ message: 'Token validation succeeded' });
    });
};
