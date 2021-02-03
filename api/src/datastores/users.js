// Cloud Run instances hang around for 10 mins

const users = {};

module.exports = {
  get: (id) => users[id],
  set: (id, user) => {
    users[id] = user;
    return user;
  },
};
