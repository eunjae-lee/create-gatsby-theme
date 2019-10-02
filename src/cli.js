import path from 'path';
import parseArgs from 'arg';
import { camelCase } from 'change-case';
import { plugins } from './plugins';
import { runPlugins } from './runPlugins';

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
  await runPlugins({
    plugins,
    opts: {
      cwd: path.resolve(opts.dir || '.'),
    },
  });
}

function printVersion() {}

function printHelp() {}

function removeDoubleDash(opts) {
  return Object.entries(opts).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    acc[camelCase(key)] = value;
    return acc;
  }, {});
}
