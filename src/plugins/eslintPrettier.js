import { withHelpers } from '../withHelpers';

export const eslintPrettier = withHelpers(
  ({ exec, useTemplate, updatePackageJson }) => ({
    questions: [
      {
        type: 'confirm',
        name: 'shouldAddEslintPrettier',
        message: 'Add ESLint and Prettier?',
        default: true,
      },
    ],
    skipIf: ({ answers: { shouldAddEslintPrettier } }) =>
      !shouldAddEslintPrettier,
    title: 'Adding ESLint and Prettier',
    run: async ({ opts: { cwd } }) => {
      const dependencies = [
        'eslint',
        'babel-eslint',
        'prettier',
        'eslint-config-algolia',
        'eslint-config-prettier',
        'eslint-plugin-import',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
      ].join(' ');
      await exec(`yarn add ${dependencies} -D -W`, {
        cwd,
      });
      useTemplate('eslintPrettier/.eslintrc.js_', {
        dest: cwd,
        fileName: '.eslintrc.js',
      });
      useTemplate('eslintPrettier/.prettierrc_', {
        dest: cwd,
        fileName: '.prettierrc',
      });
      updatePackageJson(cwd, json => {
        json.scripts.lint = 'eslint .';
        json.scripts['lint:fix'] = 'yarn run lint --fix';
      });
    },
  })
);
