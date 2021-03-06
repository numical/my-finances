const Ajv = require('ajv').default;
const formats = require('./formats');
const keywords = require('ajv-keywords');

const KEYWORDS = [
  'allRequired',
];

module.exports = logger => {
  const ajv = new Ajv({
    logger,
    keywords: [
      'metadata',
    ],
    validateSchema: true,
  });
  keywords(ajv, KEYWORDS);
  Object.entries(formats).forEach(([name, format]) => ajv.addFormat(name, format));
  return ajv;
};