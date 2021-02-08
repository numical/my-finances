const { Unauthorised } = require('../errors');

module.exports = (req, res, next) => {
  const sessionId = req.get('X-Csrf-Token');
  if (sessionId) {
    next();
  } else {
    next( new Unauthorised() )
  }
}