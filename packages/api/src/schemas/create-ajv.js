const Ajv = require('ajv').default;
const formats = require('./formats');
const keywords = require('ajv-keywords');

const KEYWORDS = ['allRequired'];

module.exports = (logger) => {
  const ajv = new Ajv({
    logger,
    keywords: ['metadata'],
    validateSchema: true,
  });
  keywords(ajv, KEYWORDS);
  for (const [name, format] of Object.entries(formats)) {
    ajv.addFormat(name, format);
  }
  return ajv;
};
