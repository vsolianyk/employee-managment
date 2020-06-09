const authGuard = require('../guards/auth');
const roleGuard = require('../guards/role');

const { createUser, currentUser, updateUser, getUsers, deleteUser } = require('../controllers/users');

module.exports = function(app, db) {
  app.get('/api/users', authGuard, roleGuard(['HR', 'Chief']), getUsers);

  app.post('/api/users', authGuard, roleGuard(['HR', 'Chief']), createUser);

  app.put('/api/users/:userId', authGuard, roleGuard(['HR', 'Chief']), updateUser);

  app.delete('/api/users/:userId', authGuard, roleGuard(['HR', 'Chief']), deleteUser);

  app.get('/api/users/current', authGuard, currentUser);
};
