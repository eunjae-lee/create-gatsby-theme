import { resolve } from 'path';
import mkdirp from 'mkdirp';
import chalk from 'chalk';
import { execAsync, useTemplate, updatePackageJson, print } from '../utils';

export const baseTemplate = {
  title: 'Creating a project and installing dependencies',
  run: async ({ opts: { cwd, packageName } }) => {
    await execAsync(`npm init -y`, { cwd });
    const initialVersion = '0.0.0';

    // root
    updatePackageJson(cwd, json => {
      json.version = initialVersion;
      json.workspaces = ['packages/*', 'examples/*'];
      json.scripts.example = 'yarn workspace example develop';
      json.scripts['example:build'] = 'yarn workspace example build';
      json.scripts.format = `prettier --write "**/*.{js,jsx,json,md}"`;
      json.private = true;
      json.license = 'MIT';
    });
    useTemplate('baseTemplate/.gitignore_', {
      dest: cwd,
      fileName: '.gitignore',
    });
    useTemplate('baseTemplate/.prettierrc_', {
      dest: cwd,
      fileName: '.prettierrc',
    });
    await execAsync(`yarn add prettier -D -W`, { cwd });

    // package
    const packageDir = resolve(cwd, 'packages', packageName);
    mkdirp.sync(packageDir);
    await execAsync(`npm init -y`, { cwd: packageDir });
    updatePackageJson(packageDir, json => {
      json.version = initialVersion;
      json.license = 'MIT';
    });
    await execAsync(`yarn workspace ${packageName} add gatsby --peer`, {
      cwd,
    });
    useTemplate('baseTemplate/index.js', { dest: packageDir });
    useTemplate('baseTemplate/gatsby-config.js', { dest: packageDir });
    useTemplate('baseTemplate/gatsby-browser.js', { dest: packageDir });
    useTemplate('baseTemplate/gatsby-node.js', { dest: packageDir });

    // example
    const exampleDir = resolve(cwd, 'examples', 'example');
    mkdirp.sync(exampleDir);
    await execAsync(`npm init -y`, { cwd: exampleDir });
    updatePackageJson(exampleDir, json => {
      json.private = true;
      json.scripts.develop = 'gatsby develop';
      json.scripts.build = 'gatsby build';
    });
    const packages = [
      `${packageName}@${initialVersion}`,
      'gatsby',
      'react',
      'react-dom',
    ].join(' ');
    await execAsync(`yarn workspace example add ${packages}`, {
      cwd,
    });
  },
  finished: ({ opts: { cwd, packageName } }) => {
    const projectPath = cwd.startsWith(resolve(__dirname))
      ? cwd.slice(resolve(__dirname).length + 1)
      : packageName;

    print(chalk.green.bold('🎉  FINISHED!'));
    print('');
    print(
      `${chalk.green('●')} Try the following command to run your example site.`
    );
    print(`    ${chalk.gray(`cd ${projectPath} && yarn run example`)}`);
    print('');
  },
};
