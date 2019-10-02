#!/usr/bin/env node

require = require("esm")(module /*, options*/);
(async function() {
  try {
    await require("../src/index").cli(process.argv);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
