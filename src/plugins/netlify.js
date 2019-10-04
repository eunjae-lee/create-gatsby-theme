import { withHelpers } from '../withHelpers';

export const netlify = withHelpers(({ useTemplate }) => ({
  questions: [
    {
      type: 'confirm',
      name: 'shouldSetupNetlify',
      message: 'Setup Netlify for example site?',
      default: true,
    },
  ],
  skipIf: ({ answers: { shouldSetupNetlify } }) => !shouldSetupNetlify,
  title: 'Setup Netlify',
  run: ({ opts: { cwd } }) => {
    useTemplate('netlify/netlify.toml', cwd);
  },
}));
