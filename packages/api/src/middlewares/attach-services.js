module.exports = (services) => {
  return (req, res, next) => {
    Object.assign(req, services);
    next();
  };
};
