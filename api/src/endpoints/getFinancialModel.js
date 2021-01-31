const handler = (req, res) => {
  res.status(200).send({
    data: [],
  });
};

module.exports = {
  verb: 'get',
  path: '/financial-model',
  handler,
};
