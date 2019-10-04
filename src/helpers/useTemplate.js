import { writeFileSync, readFileSync } from 'fs';
import { resolve, basename } from 'path';
import mkdirp from 'mkdirp';
import ejs from 'ejs';

export function useTemplate(
  templateFileName,
  { dest: destDir, fileName: destFileName = null, data = {} }
) {
  mkdirp.sync(destDir);
  const sourcePath = resolve(__dirname, '../templates/', templateFileName);
  const content = ejs.compile(readFileSync(sourcePath).toString())(data);
  writeFileSync(
    resolve(destDir, destFileName || basename(templateFileName)),
    content
  );
}
