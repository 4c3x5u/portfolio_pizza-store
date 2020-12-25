/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

import MemberSchema from '../models/memberModel';

const Member = mongoose.model('Member', MemberSchema);

export const register = (req, res) => (
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : bcrypt.hash(
      req.body.password,
      10,
      (hashErr, hashPassword) => (hashErr
        ? res.status(400).send(hashErr)
        : (
          new Member({
            email: req.body.email,
            password: hashPassword,
          }).save((dbErr, member) => (dbErr
            ? res.status(400).send(dbErr)
            : res.send({ user: member._id, token: member.password })
          ))
        )
      ),
    )
);

export const signIn = async (req, res) => (
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : Member.findOne({ email: req.body.email }).then((member, dbErr) => {
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
            res.send({ user: member._id, token: member.password });
          }
        });
      }
    })
);

export const validateToken = (req, res) => (
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : Member.findOne({ _id: req.body.user }).then((member, err) => {
      if (err) {
        res.status(400).send({ message: 'Token validation failed.' });
      } else if (!member) {
        res.status(200).send({ message: 'The user is a guest' });
      } else if (member.password && member.password !== req.body.token) {
        res.status(400).send({ message: 'Invalid authentication token.' });
      } else {
        res.send({ message: 'The user is a member.' });
      }
    })
);
