import bcrypt from 'bcrypt';

const loginController = (Member) => (
  async (req, res) => (
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
  )
);

export default loginController;
