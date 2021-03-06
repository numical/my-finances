const extractMessage = error => {
  switch (error.keyword) {
    case 'required':
      return error.message;
    case 'format':
      return `${error.dataPath} ${error.message}`;
    case 'type':
      return `${error.dataPath} ${error.message}`;
    case 'allRequired':
      return 'missing required value';
    default:
      return JSON.stringify(error);
  }
}

const buildReport = (report, error) => `${report}${extractMessage(error)}; `;

module.exports = ({ errors }, prefix = '') =>
  errors.reduce(buildReport, prefix);
