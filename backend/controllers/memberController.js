import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import MemberSchema from '../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

export const register = (req, res) => (
  req.body.password === req.body.passwordConfirmation ? (
    bcrypt.hash(req.body.password, 10, (hashErr, hashPassword) => {
      if (hashErr) { res.status(500).send(hashErr); }
      const newMember = new Member({
        email: req.body.email,
        password: hashPassword,
      });
      newMember.save((dbErr, member) => (
        dbErr ? (
          res.status(400).send(dbErr)
        ) : (
          res.send({ user: member.email, token: member.password })
        )
      ));
    })
  ) : (
    res.status(400).send({
      message: 'The password confirmation do not match the password.',
    })
  )
);

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
            // eslint-disable-next-line no-underscore-dangle
            res.send({ user: member._id.toString(), token: member.password });
          }
        });
      }
    })
);

export const validateToken = (req, res) => (
  Member.findOne({ _id: new Types.ObjectId(req.body.user) })
    .then((member, err) => {
      if (err) {
        res.status(400).send({ message: 'Token validation failed.' });
      }
      if (!member) {
        res.status(200).send({ message: 'The user is a guest' });
      }
      if (member.password && member.password !== req.body.token) {
        res.status(400).send({ message: 'Invalid authentication token.' });
      }
      res.send({ message: 'The user is a member.' });
    })
);
