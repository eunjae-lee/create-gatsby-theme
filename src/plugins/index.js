import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
// import { addReleaseTool } from './addReleaseTool';
import { eslintPrettier } from './eslintPrettier';

export const plugins = [
  baseTemplate,
  // addReleaseTool
  eslintPrettier,
  addExample,
];
