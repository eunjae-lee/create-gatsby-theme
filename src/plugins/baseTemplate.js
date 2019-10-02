import { withHelpers } from '../withHelpers';
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { resolve } from 'path';

export const baseTemplate = withHelpers(
  ({ exec, print, useTemplate, updatePackageJson }) => ({
    run: ({ opts: { cwd } }) => {
      exec(`npm init -y`, { cwd });

      updatePackageJson(cwd, json => {
        json.workspaces = ['packages/*', 'examples/*'];
        json.scripts.example = 'yarn workspace example develop';
        json.scripts['example:build'] = 'yarn workspace example build';
        json.private = true;
      });

      useTemplate('.gitignore_', cwd, '.gitignore');
      useTemplate('.prettierrc', cwd);

      exec(`git init`, { cwd });
    },
  })
);
