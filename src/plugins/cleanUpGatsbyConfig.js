import { withHelpers } from '../withHelpers';
import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';

export const cleanUpGatsbyConfig = withHelpers(
  ({ evalTemplate, execAsync }) => ({
    run: async ({ opts: { cwd, packageName } }) => {
      const gatsbyConfigPath = resolve(
        cwd,
        'packages',
        packageName,
        'gatsby-config.js'
      );

      writeFileSync(
        gatsbyConfigPath,
        evalTemplate(readFileSync(gatsbyConfigPath).toString(), {
          nextPluginPlaceholder: '',
        })
      );

      await execAsync(`npx prettier --write ${gatsbyConfigPath}`, { cwd });
    },
  })
);
