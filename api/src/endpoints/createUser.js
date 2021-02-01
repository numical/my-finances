const handler = (req, res) => {
  res.status(200).send({
    name: 'dummy name',
    pwd: 'dummy hash',
    id: 'dummy id'
  });
};

module.exports = {
  verb: 'post',
  path: '/user',
  handler,
};
