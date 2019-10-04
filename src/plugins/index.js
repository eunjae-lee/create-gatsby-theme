import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
// import { addReleaseTool } from './addReleaseTool';
import { eslintPrettier } from './eslintPrettier';
import { netlify } from './netlify';

export const plugins = [
  baseTemplate,
  // addReleaseTool
  eslintPrettier,
  netlify,
  addExample,
];
