import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcrypt'
import MemberSchema from '../models/memberModel'

const Member = mongoose.model('Member', MemberSchema)

export const register = (req, res) =>
  req.body.password === req.body.passwordConfirmation
    ? bcrypt.hash(
        req.body.password,
        10,
        (hashErr, hashPassword) =>
          (hashErr && res.status(500).send(hashErr)) ||
          new Member({
            email: req.body.email,
            password: hashPassword
          })
            .save((dbErr, member) =>
              dbErr
                ? res.status(400).send(dbErr)
                : res.send({ user: member.email, token: member.password })
            )
      )
    : res.status(400).send({ message: 'The password confirmation do not match the password.' })

export const login = async (req, res) =>
  Member
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
                    : res.send({ user: member._id.toString(), token: member.password })
            )
    )

export const validateToken = (req, res) =>
  Member.findOne({ _id: new Types.ObjectId(req.body.user) })
    .then((member, err) =>
      err
        ? res.status(400).send({ message: 'Token validation failed.' })
        : !member
            ? res.status(200).send({ message: 'The user is a guest' })
            : (member.password && member.password !== req.body.token)
                ? res.status(400).send({ message: 'Invalid authentication token.' })
                : res.send({ message: 'The user is a member.' })
    )
