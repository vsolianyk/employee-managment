const usersRoutes = require('./users');
const loginRoute = require('./login');
const profileRoutes = require('./profiles');
const googleAuthRoutes = require('./auth');
const teamRoutes = require('./team');

module.exports = function(app, db) {
  usersRoutes(app, db);
  // loginRoute(app, db);
  profileRoutes(app, db);
  teamRoutes(app, db);
  googleAuthRoutes(app, db);
};
