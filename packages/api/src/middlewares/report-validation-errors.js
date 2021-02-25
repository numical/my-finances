const { EOL } = require('os');

/*
const extractMessage = error =>
  ('/properties' === error.schemaPath)
    ? 'missing property'
    : (error.dataPath && error.message)
    ? `${error.dataPath} ${error.message}`
    : JSON.stringify(error);
 */

const extractMessage = JSON.stringify;


const buildReport = (report, error) =>`${report}${extractMessage(error)}; `;

module.exports = ({ errors }, prefix = '') => errors.reduce(buildReport, prefix);