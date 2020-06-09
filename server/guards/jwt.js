const jwt = require('jsonwebtoken');

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
};

module.exports = function verifyJWT_MW(req, res, next) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

  verifyJWTToken(token)
    .then((decodedToken) => {
      req.user = decodedToken.data;
      next();
    })
    .catch((err) => {
      res.status(400)
        .json({message: 'Invalid auth token provided.'});
    });
}