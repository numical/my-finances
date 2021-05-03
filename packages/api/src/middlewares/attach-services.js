module.exports = (services) => {
  return (request, response, next) => {
    Object.assign(request, services);
    next();
  };
};
