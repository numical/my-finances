const { log } = require('../log');

module.exports = (req, res, next) => {
  req.log = log;
  next();
}