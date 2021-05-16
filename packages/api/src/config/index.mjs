import { EOL } from 'os';

import deepMerge from './deep-merge.mjs';
import { CAN_OVERRIDE, CANNOT_OVERRIDE } from './defaults.mjs';
import reportEnvironment from './report-environment.mjs';

const config = {
  DEFAULT_TEST_LOG_LEVEL: CANNOT_OVERRIDE.log.customLevels.clientInfo,
};

export const createConfig = async (overrides = {}) => {
  deepMerge(config, CAN_OVERRIDE, overrides, CANNOT_OVERRIDE);
  return config;
};

export const report = () =>
  Object.entries(config)
    .filter(([, value]) => typeof value !== 'function')
    .reduce(
      (s, [key, value]) =>
        `${s}${EOL}  ${key}: ${JSON.stringify(value, undefined, 2)}`,
      reportEnvironment()
    );

export default config;
