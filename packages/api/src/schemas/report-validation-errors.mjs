const extractMessage = (error) => {
  const { dataPath, keyword, message } = error;
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

export default ({ errors }, prefix = '') => errors.reduce(buildReport, prefix);
