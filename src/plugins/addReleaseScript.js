import chalk from 'chalk';
import { resolve } from 'path';
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
    useTemplate('addReleaseScript/config.yml', {
      dest: resolve(cwd, '.circleci'),
    });
    updatePackageJson(cwd, json => {
      json.scripts['release:prepare'] = 'shipjs prepare';
      json.scripts['release:trigger'] = 'shipjs trigger';
    });
  },
  finished: () => {
    print(`${chalk.green('●')} The release script has been added.`);
    print('  Import this repository at https://circleci.com');
    print('  To prepare a release, you can run the following command:');
    print(`    ${chalk.gray('yarn release:prepare')}`);
    print(
      '  For more information, check out https://github.com/algolia/shipjs'
    );
    print('');
  },
};
