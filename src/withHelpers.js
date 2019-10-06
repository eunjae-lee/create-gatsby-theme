import { execAsync } from './helpers/execAsync';
import { print } from './helpers/print';
import { useTemplate } from './helpers/useTemplate';
import { evalTemplate } from './helpers/evalTemplate';
import { updatePackageJson } from './helpers/updatePackageJson';
import { gitCommitAsync } from './helpers/gitCommitAsync';

export const withHelpers = fn => {
  return fn({
    execAsync,
    print,
    useTemplate,
    evalTemplate,
    updatePackageJson,
    gitCommitAsync,
  });
};
