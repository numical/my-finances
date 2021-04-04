const extractMessage = (error) => {
  const { dataPath, keyword, message, type } = error;
  switch (keyword) {
    case 'required':
      return message;
    case 'format':
      return `${dataPath} ${message}`;
    case 'type':
      return `${dataPath || 'field'} ${message}`;
    case 'allRequired':
      return 'missing required value';
    default:
      return JSON.stringify(error);
  }
};

const buildReport = (report, error) => `${report}${extractMessage(error)}; `;

module.exports = ({ errors }, prefix = '') =>
  errors.reduce(buildReport, prefix);
