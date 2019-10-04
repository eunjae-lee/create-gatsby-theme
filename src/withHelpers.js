import execa from 'execa';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import mkdirp from 'mkdirp';

export const withHelpers = fn => {
  return fn({ exec, print, useTemplate, updatePackageJson, gitCommit });
};

function exec(command, { cwd }) {
  if (!cwd) {
    throw new Error('You must specify `cwd` options when using `exec`.');
  }
  return execa.command(command, { cwd });
}

function print(...args) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

function useTemplate(templateFileName, cwd, destPath = null) {
  mkdirp.sync(cwd);
  copyFileSync(
    resolve(__dirname, './templates/', templateFileName),
    resolve(cwd, destPath || basename(templateFileName))
  );
}

function updatePackageJson(cwd, fn) {
  const path = resolve(cwd, 'package.json');
  const json = JSON.parse(readFileSync(path).toString());
  fn(json);
  writeFileSync(path, JSON.stringify(json, null, 2));
}

async function gitCommit(message, cwd) {
  await execa('git', ['add', '.'], { cwd });
  await execa('git', ['commit', '-m', message], { cwd });
}
