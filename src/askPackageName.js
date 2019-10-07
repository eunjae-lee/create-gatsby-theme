import inquirer from 'inquirer';
import validate from 'validate-npm-package-name';
import available from 'npm-name';

// eslint-disable-next-line no-console
const print = console.log;

export async function askPackageName() {
  const { packageName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'packageName',
      message: 'Type your package name?',
    },
  ]);
  if (!validate(packageName).validForNewPackages) {
    print(`"${packageName}" is not a valid package name.`);
    return await askPackageName();
  }
  if (!(await available(packageName))) {
    const { choice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: `"${packageName}" already exists on npm.`,
        choices: [
          { name: 'Try a different name', value: 0 },
          { name: 'Just keep using it.', value: 1 },
        ],
      },
    ]);
    if (choice === 0) {
      return await askPackageName();
    }
  }
  return packageName;
}
