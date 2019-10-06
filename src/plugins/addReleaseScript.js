import chalk from 'chalk';
import { useTemplate, print, updatePackageJson } from '../utils';

export const addReleaseScript = {
  questions: [
    {
      type: 'confirm',
      name: 'shouldAddReleaseScript',
      message: 'Setup a release script?',
      default: true,
    },
  ],
  skipIf: ({ answers: { shouldAddReleaseScript } }) => !shouldAddReleaseScript,
  title: 'Setup a release script',
  run: ({ opts: { cwd, packageName } }) => {
    useTemplate('addReleaseScript/ship.config.js', {
      dest: cwd,
      data: { packageName },
    });
    updatePackageJson(cwd, json => {
      json.scripts['release:prepare'] = 'shipjs prepare';
      json.scripts['release:trigger'] = 'shipjs trigger';
    });
  },
  finished: () => {
    print(
      `${chalk.green(
        '●'
      )} To prepare a release, you can run the following command:`
    );
    print(`    ${chalk.gray('yarn release:prepare')}`);
    print('');
  },
};
