import mongoose, { Types } from 'mongoose';

const validateToken = (Member) => (
  (req, res) => (
    Member.findOne({ _id: new Types.ObjectId(req.body.user) })
      .then((member, err) => {
        if (err) { res.status(400).send({ message: 'Token validation failed. (1)' }); }
        if (!member) { res.status(400).send({ message: 'Token validation failed. (2)' }); }
        if (member.password !== req.body.token) { res.status(400).send({ message: 'Token validation failed. (3)' }); }
        res.send({ message: 'Token validation succeeded' });
      })
  )
);

export default validateToken;
