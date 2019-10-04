import { withHelpers } from '../withHelpers';
import { resolve } from 'path';
import mkdirp from 'mkdirp';

export const baseTemplate = withHelpers(
  ({ exec, useTemplate, updatePackageJson, gitCommit }) => ({
    title: 'Adding a base template',
    run: async ({ opts: { cwd, packageName } }) => {
      await exec(`npm init -y`, { cwd });
      const initialVersion = '0.0.1';

      // root
      updatePackageJson(cwd, json => {
        json.version = initialVersion;
        json.workspaces = ['packages/*', 'examples/*'];
        json.scripts.example = 'yarn workspace example develop';
        json.scripts['example:build'] = 'yarn workspace example build';
        json.private = true;
        json.license = 'MIT';
      });
      useTemplate('.gitignore_', cwd, '.gitignore');
      useTemplate('.prettierrc', cwd);

      // package
      const packageDir = resolve(cwd, 'packages', packageName);
      mkdirp.sync(packageDir);
      await exec(`npm init -y`, { cwd: packageDir });
      updatePackageJson(packageDir, json => {
        json.version = initialVersion;
        json.license = 'MIT';
      });
      await exec(`yarn workspace ${packageName} add gatsby --peer`, { cwd });
      useTemplate('package/index.js', packageDir);
      useTemplate('package/gatsby-config.js', packageDir);
      useTemplate('package/gatsby-browser.js', packageDir);
      useTemplate('package/gatsby-node.js', packageDir);

      // example
      const exampleDir = resolve(cwd, 'examples', 'example');
      mkdirp.sync(exampleDir);
      await exec(`npm init -y`, { cwd: exampleDir });
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
      await exec(`yarn workspace example add ${packages}`, {
        cwd,
      });

      // finishing
      await gitCommit(`chore: initial commit`, cwd);
    },
  })
);
