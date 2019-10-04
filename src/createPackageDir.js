import fs from 'fs';
import path from 'path';

export function createPackageDir({ cwd, packageName }) {
  const destPath = path.resolve(cwd, packageName);
  fs.mkdirSync(destPath);
  return destPath;
}
