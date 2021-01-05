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
      (hashErr, hashPassword) => {
        if (hashErr) {
          res.status(400).send('Hashing failure.');
        } else {
          Member.findOne({ email: req.body.email })
            .then((existingMember, findErr) => {
              if (findErr) {
                return res.status(400).send('Database failure.');
              }
              if (existingMember) {
                return res.status(400).send('Email already taken.');
              }
              return new Member({
                email: req.body.email,
                password: hashPassword,
              }).save((saveErr, newMember) => (saveErr
                ? res.status(400).send('Database failure.')
                : res.status(200).send({ user: newMember._id, token: newMember.password })
              ));
            });
        }
      },
    )
);

export const signIn = async (req, res) => (
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : Member.findOne({ email: req.body.email }).then((member, dbErr) => {
      if (dbErr) {
        res.status(400).send('Database failure.');
      } else if (!member) {
        res.status(400).send('Invalid email.');
      } else {
        bcrypt.compare(req.body.password, member.password, (hashErr, same) => {
          if (hashErr) {
            res.status(400).send('Hashing failure.');
          } else if (!same) {
            res.status(400).send('Invalid password.');
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
        res.status(400).send('Database failure.');
      } else if (!member) {
        res.status(400).send('Member not found.');
      } else if (member.password && member.password !== req.body.token) {
        res.status(400).send('Invalid authentication token.');
      } else {
        res.status(200).send('Token validation success.');
      }
    })
);
