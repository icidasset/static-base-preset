import chalk from 'chalk';
import Promise from 'bluebird';

import server from './tasks/server';
import watch from './tasks/watch';


/**
 * A sequence is a function that returns a promise for a Dictionary.
 * See the [static-base docs](http://icidasset.github.io/static-base/global.html#runCurry)
 * for more info.
 *
 * @callback sequence
 * @param {Object} data - Metadata for the sequence function (default is `{ changedPath, root }`)
 * @return {Promise} A promise for a Dictionary
 */


/**
 * Execute procedure.
 *
 * Makes a build and depending on the given arguments,
 * runs a web server and watches for changes.
 *
 * @param {sequence[]} sequences - Array of sequences
 */
export function exec(sequences, givenOptions) {
  const args = getProcessArguments();
  const make = generateMakeFunction(sequences);
  const options = { ...defaultOptions(), ...givenOptions };

  let promise = make(options);

  if (args.watch) promise = continueIfBuildSucceeded(promise, () => watch(make, options));
  if (args.serve) promise = continueIfBuildSucceeded(promise, () => server(options));
}


/**
 * Metadata function, builds metadata object.
 * See `src/metadata` for what it actually does.
 *
 * @param {Object} [initial={}]
 */
export { default as metadata } from './metadata';


/**
 * Other exports
 */
export { default as frontmatter } from './functions/frontmatter';
export * from './utils';


/**
 * @private
 */
const defaultOptions = () => ({
  buildDirectory: './build',
  sourceDirectory: './src',
  rootDirectory: __dirname,

  serverPort: 8080,
});


const getProcessArguments = () => ({
  serve: process.argv.includes('--serve'),
  watch: process.argv.includes('--watch'),
});


const generateMakeFunction = (sequences) => (options) => {
  console.log(chalk.bold('Processing ...'));

  return execSequences(sequences, options).then(() => {
    console.log(chalk.bold.green('Build successful!'));
    return { success: true };

  }).catch((err) => {
    console.log(chalk.bold.red(err.stack || err));
    return { success: false };

  });
};


const continueIfBuildSucceeded = (promise, fn) => {
  return promise.then(value => {
    if (typeof value === "object" && value.success === true) {
      return fn().then(() => value);
    }

    return value;
  });
};


const execSequences = (sequences, options) => {
  const data = { priv: { ...options, root: options.rootDirectory }};

  return sequences.reduce((promise, sequence) => {
    return promise.then(() => sequence(data));
  }, Promise.resolve([]));
};
