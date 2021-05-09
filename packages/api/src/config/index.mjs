import { EOL } from 'os';

import deepMerge from './deep-merge.mjs';
import { CAN_OVERRIDE, CANNOT_OVERRIDE } from './defaults.mjs';
import reportEnvironment from './report-environment.mjs';

const config = {};
const init = async (overrides = {}) =>
  deepMerge(config, CAN_OVERRIDE, overrides, CANNOT_OVERRIDE);
const report = () =>
  Object.entries(config)
    .filter(([, value]) => typeof value !== 'function')
    .reduce(
      (s, [key, value]) =>
        `${s}${EOL}  ${key}: ${JSON.stringify(value, undefined, 2)}`,
      reportEnvironment()
    );
config.init = init;
config.report = report;
config.DEFAULT_TEST_LOG_LEVEL = CANNOT_OVERRIDE.log.customLevels.clientInfo;
export default config;
