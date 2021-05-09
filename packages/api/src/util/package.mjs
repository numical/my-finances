// until --experimental-json-modules becomes default node behaviour
// thanks: https://github.com/nodejs/node/issues/20494#issuecomment-767045507

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { version } = require('../../package.json');

export { version };
