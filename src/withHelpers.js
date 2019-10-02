import { exec } from 'shelljs';

export const withHelpers = fn => {
  // eslint-disable-next-line no-console
  return fn({ exec, print: console.log });
};
