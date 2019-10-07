import { writeFileSync, appendFileSync, readFileSync } from 'fs';
import { resolve, basename } from 'path';
import mkdirp from 'mkdirp';
import { evalTemplate } from './evalTemplate';

export function useTemplate(
  templateFileName,
  { dest: destDir, fileName: destFileName = null, data = {}, append = false }
) {
  mkdirp.sync(destDir);
  const sourcePath = resolve(__dirname, '../templates/', templateFileName);
  const content = evalTemplate(readFileSync(sourcePath).toString(), data);
  const fn = append ? appendFileSync : writeFileSync;
  fn(resolve(destDir, destFileName || basename(templateFileName)), content);
}
