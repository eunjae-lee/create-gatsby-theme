import { exec } from "shelljs";

export const withHelpers = fn => {
  return fn({ exec, print: console.log });
};
