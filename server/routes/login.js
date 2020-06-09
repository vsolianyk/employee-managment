const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

module.exports = function(app, db) {
  app.post(
    '/api/login',
    [check('email').exists(), check('password').isLength({ min: 3 })],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      db.collection('users').findOne(
        {
          email: req.body.email,
        },
        (err, user) => {
          if (err) {
            return res.status(401).send({ message: err });
          }

          if (!user) {
            return res
              .status(404)
              .send({ message: 'User with such email - not found' });
          }

          bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
              return res.status(401).send({ message: 'Failed to authorize' });
            }

            if (!result) {
              return res.status(401).send({ message: 'Incorrect password' });
            }

            const loginToken = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: '3600000ms',
              },
            );

            res.cookie(
              'authorize',
              { token: loginToken },
              { signed: true, httpOnly: true },
            );
            res.send('Authorized!');
          });
        },
      );
    },
  );
};
