import bcrypt from 'bcrypt';

const registerController = (Member) => (
  (req, res) => (
    req.body.password === req.body.passwordConfirmation ? (
      bcrypt.hash(req.body.password, 10, (hashErr, hashPassword) => {
        if (hashErr) { res.status(500).send(hashErr); }
        const newMember = new Member({
          email: req.body.email,
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
      })
    ) : (
      res.status(400).send({
        message: 'The password confirmation do not match the password.',
      })
    )
  )
);

export default registerController;
