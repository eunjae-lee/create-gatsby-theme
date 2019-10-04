#!/usr/bin/env node

require = require('esm')(module /* , options*/);
(async function() {
  try {
    await require('../src/index').cli(process.argv);
    // The process never ends and it seems to be because of `ora`.
    // Without `ora`, it exits well.
    // For workaround, it's exiting explicitly here.
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
