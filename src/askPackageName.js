import inquirer from 'inquirer';
import validate from 'validate-npm-package-name';
import available from 'npm-name';

export async function askPackageName() {
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
  if (!(await available(packageName))) {
    throw new Error(`"${packageName}" already exists on npm.`);
  }
  return packageName;
}
