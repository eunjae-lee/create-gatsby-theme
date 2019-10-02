import { exec } from 'shelljs';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export const withHelpers = fn => {
  return fn({ exec, print, useTemplate, updatePackageJson });
};

function print(...args) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

function useTemplate(templateFileName, cwd, destPath = null) {
  copyFileSync(
    resolve(__dirname, './templates/', templateFileName),
    resolve(cwd, destPath || templateFileName)
  );
}

function updatePackageJson(cwd, fn) {
  const path = resolve(cwd, 'package.json');
  const json = JSON.parse(readFileSync(path).toString());
  fn(json);
  writeFileSync(path, JSON.stringify(json, null, 2));
}
