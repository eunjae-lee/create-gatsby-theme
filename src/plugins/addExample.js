import { withHelpers } from '../withHelpers';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

export const addExample = withHelpers(({ exec, useTemplate }) => ({
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
    // const gatsbyConfigPath = resolve(
    //   cwd,
    //   'packages',
    //   packageName,
    //   'gatsby-config.js'
    // );
    // TODO: fix config
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `pages`,
    //     path: `${process.cwd()}/src/pages`,
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-page-creator`,
    //   options: {
    //     path: `${process.cwd()}/src/pages`,
    //   },
    // },
    useTemplate(
      'addExample/index.js',
      resolve(cwd, 'examples', 'example', 'src', 'pages')
    );
    await exec(
      `yarn workspace ${packageName} add gatsby-source-filesystem gatsby-plugin-page-creator`,
      { cwd }
    );
  },
}));
