import { useTemplate } from '../utils';

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
};
