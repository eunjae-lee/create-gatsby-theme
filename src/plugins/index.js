import { baseTemplate } from './baseTemplate';
import { addExample } from './addExample';
import { addReleaseScript } from './addReleaseScript';
import { netlify } from './netlify';
import { createGitHubRepo } from './createGitHubRepo';
import { gitCommit } from './gitCommit';
import { cleanUpGatsbyConfig } from './cleanUpGatsbyConfig';

export const plugins = [
  baseTemplate,
  addReleaseScript,
  netlify,
  gitCommit,
  createGitHubRepo,
  addExample,
  cleanUpGatsbyConfig,
];
