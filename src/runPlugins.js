import inquirer from 'inquirer';

export async function runPlugins({ plugins, opts }) {
  const answers = [];
  const results = [];
  for (const [i, plugin] of plugins.entries()) {
    answers[i] = await inquirer.prompt(plugin.questions || []);
  }
  for (const [i, plugin] of plugins.entries()) {
    results[i] = await plugin.run({ answers: answers[i], opts });
  }
  for (const [i, plugin] of plugins.entries()) {
    if (plugin.finished) {
      await plugin.finished({ answers: answers[i], result: results[i], opts });
    }
  }
}
