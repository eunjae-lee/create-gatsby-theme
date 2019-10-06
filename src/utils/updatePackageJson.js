import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export function updatePackageJson(cwd, fn) {
  const path = resolve(cwd, 'package.json');
  const json = JSON.parse(readFileSync(path).toString());
  fn(json);
  writeFileSync(path, JSON.stringify(json, null, 2));
}
