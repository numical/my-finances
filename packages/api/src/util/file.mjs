// thanks to https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

import path from 'path';
import { fileURLToPath } from 'url';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  __filename,
  __dirname,
};
