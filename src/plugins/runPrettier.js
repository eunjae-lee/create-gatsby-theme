import { withHelpers } from '../withHelpers';

export const runPrettier = withHelpers(({ execAsync }) => ({
  run: async ({ opts: { cwd } }) => {
    await execAsync(`yarn run format`, { cwd });
  },
}));
