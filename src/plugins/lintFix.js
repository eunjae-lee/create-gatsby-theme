import { withHelpers } from '../withHelpers';

export const lintFix = withHelpers(({ exec }) => ({
  run: ({ opts: { cwd } }) => {
    exec(`yarn run lint:fix`, { cwd, ignoreError: true });
  },
}));
