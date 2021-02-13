const os = require('os');
const { stripIndent } = require('common-tags');

// thanks to https://www.semicolonworld.com/javascript/tutorial/convert-file-size-bytes-to-kb-mb-gb-javascript
const formatBytes = (bytes, decimalPoint = 2) => {
  if (bytes == 0) return '0 Bytes';
  let k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimalPoint)) + ' ' + sizes[i]
  );
};

const serializeConfig = (config) =>
  Object.entries(config).reduce(
    (s, [key, value]) => `${s}${os.EOL}  ${key}: ${value}`,
    ''
  );

module.exports = (config) => {
  return (
    stripIndent`
    Server Startup:
    OS:
      number of CPU's: ${os.cpus().length} 
      CPU type: ${os.cpus()[0].model}
      total memory: ${formatBytes(os.totalmem())} 
    ENV:
      NODE_ENV: ${process.env.NODE_ENV}
    CONFIG:  
  ` + serializeConfig(config)
  );
};
