const os = require('os');
const { stripIndent } = require('common-tags');
const formatBytes = require('./format-bytes');

module.exports = () => stripIndent`
  Server Startup:
  OS:
    number of CPU's: ${os.cpus().length} 
    CPU type: ${os.cpus()[0].model}
    total memory: ${formatBytes(os.totalmem())} 
  ENV:
    NODE_ENV: ${process.env.NODE_ENV}
`;
