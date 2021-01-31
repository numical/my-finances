const handler = (req, res) => {
  res.status(200).send({
    name: 'Mike Evans',
    email: 'mike.evans@numical.com',
    id: 12345,
    keyMap: '4563454376758019087857932987r923y85yty988232'
  });
}

module.exports = {
  verb : 'get',
  path: '/user',
  handler
};