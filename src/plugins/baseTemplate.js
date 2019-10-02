import { withHelpers } from "../withHelpers";

export const baseTemplate = withHelpers(({ exec, print }) => ({
  run: ({ opts: { cwd, packageName } }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        print(`Generating ${packageName}...`);
        resolve({
          some: "result"
        });
      }, 3000);
    });
  },
  finished: ({ opts: { packageName }, result: { some } }) => {
    print(`${packageName} is created successfully!`);
    print(`some: ${some}`);
  }
}));
