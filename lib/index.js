'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadata = void 0;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _metadata = require('./metadata');

Object.defineProperty(exports, 'metadata', {
  enumerable: true,
  get: function () {
    function get() {
      return _interopRequireDefault(_metadata)['default'];
    }

    return get;
  }()
});

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      function get() {
        return _utils[key];
      }

      return get;
    }()
  });
});
exports.exec = exec;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _server = require('./tasks/server');

var _server2 = _interopRequireDefault(_server);

var _watch = require('./tasks/watch');

var _watch2 = _interopRequireDefault(_watch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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
var defaultOptions = function defaultOptions() {
  return {
    buildDirectory: './build',
    sourceDirectory: './src',
    rootDirectory: __dirname,

    serverPort: 8080,
    clientSideRouting: true
  };
};

/**
 * Execute procedure.
 *
 * Makes a build and depending on the given arguments,
 * runs a web server and watches for changes.
 *
 * @param {sequence[]} sequences - Array of sequences
 */
function exec(sequences, options) {
  var args = flags();
  var make = supervise(sequences);
  var opts = _extends({}, defaultOptions(), options);

  var promise = make(opts);

  if (args.watch) promise = promise.then(function () {
    return (0, _watch2['default'])(make, opts);
  });
  if (args.serve) promise = promise.then(function () {
    return (0, _server2['default'])(opts);
  });

  return promise;
}

/**
 * @private
 */
var flags = function flags() {
  return {
    serve: process.argv.includes('--serve'),
    watch: process.argv.includes('--watch')
  };
};

var supervise = function supervise(sequences) {
  return function (options) {
    console.log(_chalk2['default'].bold('Processing ...'));

    return execSequences(sequences, options).then(function (results) {
      console.log(_chalk2['default'].bold.green('Build successful!'));
      return results;
    })['catch'](function (err) {
      console.log(_chalk2['default'].bold.red(err.stack || err));
      throw new Error(err);
    });
  };
};

var execSequences = function execSequences(sequences, options) {
  // attributes passed to every sequence
  var attr = { priv: _extends({}, options, { root: options.rootDirectory }) };

  // execute every sequence and return promise
  var promise = _bluebird2['default'].resolve();
  var results = [];

  sequences.forEach(function (sequence) {
    promise = promise.then(function (result) {
      if (result) results.push(result);
      return sequence(attr);
    });
  });

  return promise.then(function (lastResult) {
    return [].concat(results, [lastResult]);
  });
};