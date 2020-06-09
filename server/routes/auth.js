const { authorize, logout, googleAuth } = require('../controllers/auth');

module.exports = function(app, db) {
  app.get('/auth', authorize);

  app.get('/logout', logout);

  app.get('/google-auth', googleAuth);
};
