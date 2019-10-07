import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { evalTemplate, execAsync } from '../utils';

export const cleanUpGatsbyConfig = {
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
};
