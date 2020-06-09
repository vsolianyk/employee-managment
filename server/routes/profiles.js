const authGuard = require('../guards/auth');
const roleGuard = require('../guards/role');

const { getProfiles, getProfilesForPicker, getProfile, updateProfile } = require('../controllers/profiles');

module.exports = function(app, db) {
  app.get('/api/profiles', authGuard, roleGuard(['HR', 'PM', 'Chief']), getProfiles);

  app.get('/api/profiles/picker', authGuard, roleGuard(['HR', 'PM', 'Chief']), getProfilesForPicker);

  app.get('/api/profiles/:id', authGuard, roleGuard(['HR', 'PM', 'Chief']), getProfile);

  app.put('/api/profiles/:id/jobInfo', authGuard, roleGuard(['HR', 'Chief']), updateProfile('jobInfo'));

  app.put('/api/profiles/:id/personalInfo', authGuard, roleGuard(['HR', 'PM', 'Chief']), updateProfile('personalInfo'));
}
