import chalk from 'chalk';
import { print, execAsync } from '../utils';

export const createGitHubRepo = {
  questions: [
    {
      type: 'confirm',
      name: 'shouldCreateRepo',
      message: 'Create a repository on GitHub?',
      default: true,
    },
  ],
  skipIf: ({ answers: { shouldCreateRepo } }) => !shouldCreateRepo,
  title: 'Create a repository on GitHub',
  run: async ({ opts: { cwd } }) => {
    const hubExists =
      (await execAsync(`hub --version`, {
        cwd,
        ignoreError: true,
      })) !== null;

    let repoURL;
    if (hubExists) {
      const { stdout } = await execAsync(`hub create`, { cwd });
      repoURL = stdout
        .split('\n')
        .find(line => line.includes('github.com'))
        .trim();

      await execAsync('git push --set-upstream origin master', { cwd });
    }

    return { hubExists, repoURL };
  },
  finished: ({ result: { hubExists, repoURL } }) => {
    if (hubExists) {
      print(`${chalk.green('●')} The git repository has been created.`);
      print(`    ${chalk.gray(repoURL)}`);
    } else {
      print(`${chalk.yellow('●')} Failed to create a git repository.`);
      print('  You can do this manually at https://github.com');
      print('  or run the following command:');
      print(`    ${chalk.gray('brew install hub && hub create')}`);
      print('  For more information, check out https://hub.github.com');
    }
    print('');
  },
};
