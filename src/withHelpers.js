import { exec } from './helpers/exec';
import { print } from './helpers/print';
import { useTemplate } from './helpers/useTemplate';
import { updatePackageJson } from './helpers/updatePackageJson';
import { gitCommit } from './helpers/gitCommit';

export const withHelpers = fn => {
  return fn({ exec, print, useTemplate, updatePackageJson, gitCommit });
};
