import execa from 'execa';

export async function gitCommitAsync(message, cwd) {
  await execa('git', ['add', '.'], { cwd });
  await execa('git', ['commit', '-m', message], { cwd });
}
