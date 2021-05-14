import ajv from 'ajv';
import keywords from 'ajv-keywords';

import * as formats from './formats.mjs';

const Ajv = ajv.default;
const KEYWORDS = ['allRequired'];

export default (logger) => {
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
