import path from 'path';
import parseArgs from 'arg';
import { camelCase } from 'change-case';
import { plugins } from './plugins';
import { runPlugins } from './runPlugins';
import { askPackageName } from './askPackageName';
import { createPackageDir } from './createPackageDir';

export async function cli(argv) {
  const firstArg = (argv[2] || '').trim();
  if (firstArg === '--version') {
    printVersion();
    return;
  } else if (firstArg === '--help') {
    printHelp();
    return;
  }
  const opts = removeDoubleDash(
    parseArgs(
      {
        '--dir': String,

        // Aliases
        '-d': '--dir',
      },
      { permissive: false, argv }
    )
  );
  const packageName = await askPackageName();
  const cwd = createPackageDir({
    cwd: path.resolve(opts.dir || '.'),
    packageName,
  });

  await runPlugins({
    plugins,
    opts: {
      packageName,
      cwd,
    },
  });

  printDone({ packageName });
}

function printVersion() {}

function printHelp() {}

function printDone({ packageName }) {
  // eslint-disable-next-line no-console
  console.log(`cd ${packageName} && yarn example`);
}

function removeDoubleDash(opts) {
  return Object.entries(opts).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    acc[camelCase(key)] = value;
    return acc;
  }, {});
}
