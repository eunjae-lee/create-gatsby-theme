import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
import { addReleaseScript } from './addReleaseScript';
import { netlify } from './netlify';
import { gitCommit } from './gitCommit';
import { cleanUpGatsbyConfig } from './cleanUpGatsbyConfig';

export const plugins = [
  baseTemplate,
  addReleaseScript,
  netlify,
  gitCommit,
  addExample,
  cleanUpGatsbyConfig,
];
