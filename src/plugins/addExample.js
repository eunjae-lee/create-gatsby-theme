import { withHelpers } from '../withHelpers';
import { resolve } from 'path';
import { writeFileSync, readFileSync } from 'fs';

export const addExample = withHelpers(
  ({ exec, evalTemplate, useTemplate }) => ({
    questions: [
      {
        type: 'confirm',
        name: 'shouldAddExample',
        message: 'Add an example?',
        default: true,
      },
    ],
    skipIf: ({ answers: { shouldAddExample } }) => !shouldAddExample,
    title: 'Adding an example to theme and example',
    run: async ({ opts: { cwd, packageName } }) => {
      const packageDir = resolve(cwd, 'packages', packageName);
      const gatsbyConfigPath = resolve(packageDir, 'gatsby-config.js');

      const plugins = `{
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: \`${process.cwd()}/src/pages\`,
      },
    },
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: \`${process.cwd()}/src/pages\`,
      },
    },
    {{ nextPluginPlaceholder }}`;
      writeFileSync(
        gatsbyConfigPath,
        evalTemplate(readFileSync(gatsbyConfigPath).toString(), {
          nextPluginPlaceholder: plugins,
        })
      );
      useTemplate('addExample/index.js', {
        dest: resolve(cwd, 'examples', 'example', 'src', 'pages'),
      });
      await exec(
        `yarn workspace ${packageName} add gatsby-source-filesystem gatsby-plugin-page-creator`,
        { cwd }
      );
    },
  })
);
