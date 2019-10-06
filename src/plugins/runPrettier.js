import { withHelpers } from '../withHelpers';

export const runPrettier = withHelpers(({ exec }) => ({
  run: async ({ opts: { cwd } }) => {
    await exec(`yarn run format`, { cwd });
  },
}));
