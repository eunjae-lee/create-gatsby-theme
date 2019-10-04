import inquirer from 'inquirer';
import ora from 'ora';

export async function runPlugins({ plugins, opts }) {
  const answers = [];
  const results = [];
  for (const [i, plugin] of plugins.entries()) {
    answers[i] = await inquirer.prompt(plugin.questions || []);
  }

  // eslint-disable-next-line no-console
  console.log('');

  for (const [i, plugin] of plugins.entries()) {
    const skip =
      plugin.skipIf &&
      typeof plugin.skipIf === 'function' &&
      plugin.skipIf({ answers: answers[i], opts });
    if (!skip) {
      const spinner = ora(plugin.title).start();
      results[i] = await plugin.run({ answers: answers[i], opts });
      spinner.succeed();
    }
  }
  for (const [i, plugin] of plugins.entries()) {
    if (plugin.finished) {
      await plugin.finished({ answers: answers[i], result: results[i], opts });
    }
  }
}
