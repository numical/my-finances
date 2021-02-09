const { cookie, extractJWT } = require('../auth');
const { Unauthorised } = require('../errors');

console.log(cookie);

module.exports = (req, res, next) => {
  const sessionId = req.get('X-Csrf-Token');
  if (!sessionId) {
    next(new Unauthorised());
    return;
  }

  const token = req.cookies[cookie.name];
  if (!token) {
    next(new Unauthorised());
    return;
  }

  extractJWT(token)
    .then(payload => {
      if (payload.sessionId === sessionId) {
        next()
      } else {
        next( new Unauthorised())
      }
    })
    .catch(err => {
      next( new Unauthorised())
    });

  // TODO - nonce
  // TODO - user id
}