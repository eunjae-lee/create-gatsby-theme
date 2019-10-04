import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
import { addReleaseScript } from './addReleaseScript';
import { eslintPrettier } from './eslintPrettier';
import { netlify } from './netlify';

export const plugins = [
  baseTemplate,
  addReleaseScript,
  eslintPrettier,
  netlify,
  addExample,
];
