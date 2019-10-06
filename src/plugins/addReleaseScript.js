import { useTemplate } from '../utils';

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
  },
};
