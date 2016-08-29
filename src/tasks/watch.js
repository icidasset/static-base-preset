import { renderErrorsFromPromise } from '../utils';
import { resolve } from 'path';
import { cleanPath } from 'static-base';
import chalk from 'chalk';
import chokidar from 'chokidar';
import Promise from 'bluebird';


export default function watch(make, options) {
  const cwd = options.rootDirectory;
  const src = cleanPath(options.sourceDirectory);
  const pattern = `${src}/**/*`;

  chokidar.watch(pattern, { cwd, ignoreInitial: true }).on('all', (event, path) => {
    console.log(`{watch:${event}}`, path);
    make({ ...options, changedPath: path }).catchReturn();
  });

  console.log(chalk.bold.magenta(`Watching ${pattern}`));

  return Promise.resolve();
}
