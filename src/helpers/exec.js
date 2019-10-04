import execa from 'execa';

export function exec(command, { cwd }) {
  if (!cwd) {
    throw new Error('You must specify `cwd` options when using `exec`.');
  }
  return execa.command(command, { cwd });
}
