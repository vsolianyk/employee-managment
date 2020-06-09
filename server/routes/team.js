const authGuard = require('../guards/auth');
const roleGuard = require('../guards/role');

const { getTeams, createTeam, getTeam, updateTeam, deleteTeam } = require('../controllers/teams');

module.exports = function(app, db) {
  app.get('/api/teams', authGuard, roleGuard(['HR', 'PM', 'Chief']), getTeams);

  app.post('/api/teams', authGuard, roleGuard(['PM', 'Chief']), createTeam);

  app.get('/api/teams/:teamId', authGuard, roleGuard(['HR', 'PM', 'Chief']), getTeam);

  app.put('/api/teams/:teamId', authGuard, roleGuard(['PM', 'Chief']), updateTeam);

  app.delete('/api/teams/:teamId', authGuard, roleGuard(['PM', 'Chief']), deleteTeam);
}
