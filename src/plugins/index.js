import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
import { addReleaseScript } from './addReleaseScript';
import { eslintPrettier } from './eslintPrettier';
import { netlify } from './netlify';
import { cleanUpGatsbyConfig } from './cleanUpGatsbyConfig';
import { yarnInstall } from './yarnInstall';
import { lintFix } from './lintFix';

export const plugins = [
  baseTemplate,
  addReleaseScript,
  eslintPrettier,
  netlify,
  addExample,
  cleanUpGatsbyConfig,
  yarnInstall,
  lintFix,
];
