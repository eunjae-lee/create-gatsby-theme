import inquirer from "inquirer";
import fs from "fs";
import path from "path";

export async function runPlugins({ plugins, opts: orgOpts }) {
  const answers = [],
    results = [];
  const { packageName, cwd } = await createPackageDir({ cwd: orgOpts.cwd });
  const opts = {
    packageName,
    cwd
  };
  for (const [i, plugin] of plugins.entries()) {
    answers[i] = await inquirer.prompt(plugin.questions || []);
  }
  for (const [i, plugin] of plugins.entries()) {
    results[i] = await plugin.run({ answers: answers[i], opts });
  }
  for (const [i, plugin] of plugins.entries()) {
    await plugin.finished({ answers: answers[i], result: results[i], opts });
  }
}

async function createPackageDir({ cwd }) {
  const { packageName } = await inquirer.prompt([
    {
      type: "input",
      name: "packageName",
      message: "Type your package name?"
    }
  ]);
  const destPath = path.resolve(cwd, packageName);
  fs.mkdirSync(destPath);
  return {
    packageName,
    cwd: destPath
  };
}
