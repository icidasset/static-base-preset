import chalk from 'chalk';
import server from './tasks/server';
import watch from './tasks/watch';
import Promise from 'bluebird';

export { default as metadata } from './metadata';
export * from './utils';


/**
 * A sequence is a function that returns a promise for a Dictionary.
 * See the [static-base docs](http://icidasset.github.io/static-base/global.html#runCurry)
 * for more info.
 *
 * @callback sequence
 * @param {Object} data - Metadata for the sequence function (default is `{ changedPath, root }`)
 * @param {Array} result - The result of the previous sequence
 * @return {Promise} A promise for a Dictionary
 */


/**
 * The default options.
 * @namespace
 * @property {string} buildDirectory='./build' - The output directory
 * @property {string} sourceDirectory='./src' - The input directory (used by `watch` task)
 * @property {string} rootDirectory=__dirname - The root directory
 * @property {number} serverPort=8080 - The port used by the server
 * @property {boolean} clientSideRouting=true - See the
 *   [surge.sh docs](https://surge.sh/help/adding-a-200-page-for-client-side-routing)
 *   for more info.
 */
const defaultOptions = () => ({
  buildDirectory: './build',
  sourceDirectory: './src',
  rootDirectory: __dirname,

  serverPort: 8080,
  clientSideRouting: true,
});


/**
 * Execute procedure.
 *
 * Makes a build and depending on the given arguments,
 * runs a web server and watches for changes.
 *
 * @param {sequence[]} sequences - Array of sequences
 * @return {Promise}
 */
export function exec(sequences, options) {
  const args = flags();
  const make = supervise(sequences);
  const opts = { ...defaultOptions(), ...options };

  let promise = make(opts);

  if (args.watch) promise = promise.then(() => watch(make, opts));
  if (args.serve) promise = promise.then(() => server(opts));

  return promise.catch(error => ({ error }));
}


/**
 * @private
 */
const flags = () => ({
  serve: process.argv.includes('--serve'),
  watch: process.argv.includes('--watch'),
});


const supervise = (sequences) => (options) => {
  console.log(chalk.bold('Processing ...'));

  return execSequences(sequences, options).then(results => {
    console.log(chalk.bold.green('Build successful!'));
    return results;

  }).catch(err => {
    console.log(chalk.bold.red(err.stack || err));
    throw new Error(err);

  });
};


const execSequences = (sequences, options) => {
  // attributes passed to every sequence
  const attr = { priv: { ...options, root: options.rootDirectory }};

  // execute every sequence and return promise
  let promise = Promise.resolve();
  let results = [];

  sequences.forEach(sequence => {
    promise = promise.then(result => {
      if (result) results.push(result);
      return sequence(attr, result);
    });
  });

  return promise.then(lastResult => [...results, lastResult]);
};
