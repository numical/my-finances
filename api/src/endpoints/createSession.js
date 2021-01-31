const handler = (req, res) => {
  res.status(200).send({
    timeout: Date.now() + 10 * 60 * 1000
  });
}

module.exports = {
  verb : 'post',
  path: '/session',
  handler
};