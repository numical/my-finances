export default (services) => {
  return (request, response, next) => {
    Object.assign(request, services);
    next();
  };
};
