const path = require('path');
const fs = require('fs');

module.exports = {
  monorepo: {
    readVersionFrom: 'package.json',
    packagesToBump: ['packages/*', 'examples/*'],
    packagesToPublish: ['packages/*'],
  },
  versionUpdated: ({ version, dir, exec }) => {
    // update package.json
    const packageJsonPath = path.resolve(dir, 'package.json');
    const json = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    json.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(json, null, 2));

    // update dependency in the example
    exec(`yarn workspace example add <%= packageName %>@${version}`);
  },
};
