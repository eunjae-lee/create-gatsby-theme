import inquirer from 'inquirer';
import ora from 'ora';

export async function runPlugins({ plugins, opts }) {
  const answers = [];
  const results = [];
  const shouldSkip = [];
  for (const [i, plugin] of plugins.entries()) {
    answers[i] = await inquirer.prompt(plugin.questions || []);
  }

  for (const [i, plugin] of plugins.entries()) {
    shouldSkip[i] =
      plugin.skipIf &&
      typeof plugin.skipIf === 'function' &&
      plugin.skipIf({ answers: answers[i], opts });
  }

  // eslint-disable-next-line no-console
  console.log('');

  for (const [i, plugin] of plugins.entries()) {
    if (!shouldSkip[i]) {
      const spinner = plugin.title ? ora(plugin.title).start() : undefined;
      results[i] = await plugin.run({ answers: answers[i], opts });
      if (spinner) {
        spinner.succeed();
      }
    }
  }

  // eslint-disable-next-line no-console
  console.log('');

  for (const [i, plugin] of plugins.entries()) {
    if (!shouldSkip[i] && plugin.finished) {
      await plugin.finished({ answers: answers[i], result: results[i], opts });
    }
  }
}
