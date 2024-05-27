const passport = require('../config/passport');

module.exports = (req, res, next) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};
