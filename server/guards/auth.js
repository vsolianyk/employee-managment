
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const { setAuthCookie } = require('../utils/auth');

async function authGuard (req, res, next) {
    const { authorize } = req.signedCookies;

    if (!authorize) {
      return res.status(401).send();
    }

    try {
      let userId;
      try {
        const decodedAccessToken = jwt.verify(
          authorize.access,
          process.env.JWT_SECRET,
        );
        userId = decodedAccessToken.userId;
      } catch(e) {
        try {
          const decodedRefreshToken = jwt.verify(
            authorize.refresh,
            process.env.JWT_SECRET,
          );
          userId = decodedRefreshToken.userId;
        } catch (e) {
          return res.status(401).send();
        }
        setAuthCookie(res, userId);
      }
      const user = await UserModel.findOne({ _id: ObjectId(userId) });
      if (!user || !user.isActive) {
        return res.status(401).send();
      }
      req.user = user;
      next(); 
    } catch (error) {
        return res.status(500).send({ message: error });
    }
}

module.exports = authGuard;