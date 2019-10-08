import inquirer from 'inquirer';
import ora from 'ora';

export async function runPlugins({ plugins, opts }) {
  const answers = [];
  const results = [];
  for (const [i, plugin] of plugins.entries()) {
    answers[i] = await inquirer.prompt(plugin.questions || []);
  }

  const shouldSkip = (plugin, index) =>
    plugin.skipIf &&
    typeof plugin.skipIf === 'function' &&
    plugin.skipIf({ answers: answers[index], opts });

  // eslint-disable-next-line no-console
  console.log('');

  for (const [i, plugin] of plugins.entries()) {
    if (!shouldSkip(plugin, i)) {
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
    if (plugin.finished && !shouldSkip(plugin, i)) {
      await plugin.finished({ answers: answers[i], result: results[i], opts });
    }
  }
}
