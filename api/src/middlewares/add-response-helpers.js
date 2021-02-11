const cookieLib = require('cookie');

// thanks to https://github.com/expressjs/express/blob/master/lib/response.js
function cookie (name, value, options) {
  const val = typeof value === 'object'
    ? 'j:' + JSON.stringify(value)
    : String(value);
  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  if (options.path == null) {
    options.path = '/';
  }
  // note: not appending as in Express - see res.append()
  this.setHeader('Set-Cookie', cookieLib.serialize(name, val, options));
  return this;
}

// thanks to https://github.com/lukeed/polka/blob/master/packages/send-type/index.js
function json (data) {
  const s = JSON.stringify(data);
  this.writeHead(200, {
    'content-type': 'application/json;charset=utf-8',
    'content-length': Buffer.byteLength(s)
  });
  this.end(s);
  return this;
}

// thanks to https://github.com/expressjs/express/blob/master/lib/response.js
function status (code) {
  this.statusCode = code;
  return this;
}

module.exports = (req, res, next) => {
  res.cookie = cookie;
  res.json = json;
  res.status = status;
  next()
}