import execa from 'execa';

export async function gitCommit(message, cwd) {
  await execa('git', ['add', '.'], { cwd });
  await execa('git', ['commit', '-m', message], { cwd });
}
