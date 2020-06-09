const jwt = require('jsonwebtoken');

const SESSION_DURATION = 60 * 60 * 1000;

function setAuthCookie(res, userId) {
  const auhorizeToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: `${SESSION_DURATION / 2}ms`,
    },
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: `${SESSION_DURATION}ms`,
    },
  );

  res.cookie(
    'authorize',
    { 
      access: auhorizeToken,
      refresh: refreshToken,
    },
    { signed: true, httpOnly: true },
  );
}
  
module.exports = {
  setAuthCookie,
};