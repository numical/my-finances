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
    GOOGLE_APPLICATION_CREDENTIALS: ${
      process.env.GOOGLE_APPLICATION_CREDENTIALS
    }
    NODE_ENV: ${process.env.NODE_ENV} (currently not used)
`;
