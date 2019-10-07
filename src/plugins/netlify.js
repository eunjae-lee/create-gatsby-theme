import chalk from 'chalk';
import { useTemplate, print } from '../utils';

export const netlify = {
  questions: [
    {
      type: 'confirm',
      name: 'shouldSetupNetlify',
      message: 'Setup Netlify for a demo site?',
      default: true,
    },
  ],
  skipIf: ({ answers: { shouldSetupNetlify } }) => !shouldSetupNetlify,
  title: 'Setup Netlify',
  run: ({ opts: { cwd } }) => {
    useTemplate('netlify/netlify.toml', { dest: cwd });
  },
  finished: () => {
    print(`${chalk.green('●')} \`netlify.toml\` has been added.`);
    print('  Import this repository at https://www.netlify.com');
    print('');
  },
};
