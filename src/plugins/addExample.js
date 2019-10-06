import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { execAsync, evalTemplate, useTemplate } from '../utils';

export const addExample = {
  questions: [
    {
      type: 'confirm',
      name: 'shouldAddExample',
      message: 'Add some sample code?',
      default: true,
    },
  ],
  skipIf: ({ answers: { shouldAddExample } }) => !shouldAddExample,
  title: 'Adding sample code',
  run: async ({ opts: { cwd, packageName } }) => {
    const packageDir = resolve(cwd, 'packages', packageName);
    const gatsbyConfigPath = resolve(packageDir, 'gatsby-config.js');

    const plugins = readFileSync(
      resolve(__dirname, '../templates/addExample/plugins.js')
    ).toString();
    writeFileSync(
      gatsbyConfigPath,
      evalTemplate(readFileSync(gatsbyConfigPath).toString(), {
        nextPluginPlaceholder: plugins,
      })
    );
    useTemplate('addExample/index.js', {
      dest: resolve(cwd, 'examples', 'example', 'src', 'pages'),
    });
    await execAsync(
      `yarn workspace ${packageName} add gatsby-source-filesystem gatsby-plugin-page-creator`,
      { cwd }
    );
  },
};
