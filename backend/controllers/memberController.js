import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator'

import MemberSchema from '../models/memberModel'

const Member = mongoose.model('Member', MemberSchema)

export const register = (req, res) =>
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : bcrypt.hash(
      req.body.password,
      10,
      (hashErr, hashPassword) =>
        hashErr
          ? res.status(400).send(hashErr)
          : new Member({
            email: req.body.email,
            password: hashPassword
          }).save((dbErr, member) =>
            dbErr
              ? res.status(400).send(dbErr)
              : res.send({ user: member._id, token: member.password })
          )
    )

export const login = async (req, res) =>
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : Member
      .findOne({ email: req.body.email })
      .then((member, dbErr) =>
        dbErr
          ? res.status(400).send({ message: 'MongoDB: Something went wrong.' })
          : !member
              ? res.status(400).send({ message: 'The email does not exist' })
              : bcrypt.compare(req.body.password, member.password, (hashErr, same) =>
                hashErr
                  ? res.status(400).send(hashErr)
                  : !same
                      ? res.status(400).send({ message: 'The password is invalid' })
                      : res.send({ user: member._id, token: member.password })
              )
      )

export const validateToken = (req, res) =>
  !validationResult(req).isEmpty()
    ? res.status(400).json({ errors: validationResult(req).array() })
    : Member.findOne({ _id: req.body.user })
      .then((member, err) =>
        err
          ? res.status(400).send({ message: 'Token validation failed.' })
          : !member
              ? res.status(200).send({ message: 'The user is a guest' })
              : (member.password && member.password !== req.body.token)
                  ? res.status(400).send({ message: 'Invalid authentication token.' })
                  : res.send({ message: 'The user is a member.' })
      )
