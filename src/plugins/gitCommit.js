import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { evalTemplate, execAsync, gitCommitAsync } from '../utils';

export const gitCommit = {
  run: async ({ opts: { cwd, packageName } }) => {
    const gatsbyConfigPath = resolve(
      cwd,
      'packages',
      packageName,
      'gatsby-config.js'
    );

    // remove placeholder
    const gatsbyConfig = readFileSync(gatsbyConfigPath).toString();
    writeFileSync(
      gatsbyConfigPath,
      evalTemplate(gatsbyConfig, {
        nextPluginPlaceholder: '',
      })
    );
    // run prettier
    await execAsync(`npx prettier --write ${gatsbyConfigPath}`, { cwd });
    // git commit
    await gitCommitAsync('chore: initial commit', cwd);

    // put the placeholder back for the next step
    writeFileSync(gatsbyConfigPath, gatsbyConfig);
  },
};
