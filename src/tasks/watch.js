import { resolve } from 'path';
import { cleanPath } from 'static-base/lib/utils';
import chokidar from 'chokidar';
import Promise from 'bluebird';

import { renderErrorsFromPromise } from '../utils';


export default function watch(make, options) {
  const cwd = options.rootDirectory;
  const src = cleanPath(options.sourceDirectory);
  const pattern = `${src}/**/*`;

  chokidar.watch(pattern, { cwd, ignoreInitial: true }).on('all', (event, path) => {
    console.log(`{watch:${event}}`, path);
    make({ ...options, changedPath: path });
  });

  return Promise.resolve();
}
