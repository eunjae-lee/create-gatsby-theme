import { withHelpers } from '../withHelpers';

export const yarnInstall = withHelpers(({ exec }) => ({
  run: ({ opts: { cwd } }) => {
    exec(`yarn install`, { cwd });
  },
}));
