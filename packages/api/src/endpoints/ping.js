const handler = (req, res) => {
  res.status(200).send('OK');
};

module.exports = {
  verb: 'get',
  path: '/ping',
  handler,
};
