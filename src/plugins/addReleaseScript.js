import chalk from 'chalk';
import { resolve } from 'path';
import { useTemplate, print, updatePackageJson, execAsync } from '../utils';

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
  run: async ({ opts: { cwd, packageName } }) => {
    useTemplate('addReleaseScript/ship.config.js', {
      dest: cwd,
      data: { packageName },
    });
    useTemplate('addReleaseScript/config.yml', {
      dest: resolve(cwd, '.circleci'),
    });
    useTemplate('addReleaseScript/README.md', {
      dest: cwd,
      append: true,
    });
    updatePackageJson(cwd, json => {
      json.scripts['release:prepare'] = 'shipjs prepare';
      json.scripts['release:trigger'] = 'shipjs trigger';
    });
    await execAsync(`yarn add shipjs -D -W`, {
      cwd,
    });
  },
  finished: () => {
    print(`${chalk.green('●')} The release script has been added.`);
    print('  Import this repository at https://circleci.com');
    print('  To prepare a release, you can run the following command:');
    print(`    ${chalk.gray('yarn release:prepare')}`);
    print('  To finish the setup on CircleCI side, check out the following:');
    print(
      '  https://github.com/algolia/shipjs/blob/master/GUIDE.md#automate-part-3-shipjs-trigger-on-your-ci'
    );
    print('');
  },
};
