import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
import { addReleaseScript } from './addReleaseScript';
import { netlify } from './netlify';
import { cleanUpGatsbyConfig } from './cleanUpGatsbyConfig';
import { runPrettier } from './runPrettier';

export const plugins = [
  baseTemplate,
  addReleaseScript,
  netlify,
  addExample,
  cleanUpGatsbyConfig,
  runPrettier,
];
