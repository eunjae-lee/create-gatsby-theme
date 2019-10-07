import execa from 'execa';

export async function execAsync(command, { cwd, ignoreError }) {
  if (!cwd) {
    throw new Error('You must specify `cwd` options when using `exec`.');
  }
  try {
    return await execa.command(command, { cwd });
  } catch (e) {
    if (!ignoreError) {
      throw e;
    }
    return null;
  }
}
