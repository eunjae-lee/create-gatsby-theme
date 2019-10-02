import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import validate from 'validate-npm-package-name';

export async function createPackageDir({ cwd }) {
  const { packageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'packageName',
      message: 'Type your package name?',
    },
  ]);
  if (!validate(packageName).validForNewPackages) {
    throw new Error(`"${packageName}" is not a valid package name.`);
  }
  const destPath = path.resolve(cwd, packageName);
  fs.mkdirSync(destPath);
  return {
    packageName,
    cwd: destPath,
  };
}
