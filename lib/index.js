'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frontmatter = exports.metadata = void 0;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.exec = exec;

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

var _frontmatter = require('./functions/frontmatter');

Object.defineProperty(exports, 'frontmatter', {
  enumerable: true,
  get: function () {
    function get() {
      return _interopRequireDefault(_frontmatter)['default'];
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
 * Execute procedure.
 *
 * Makes a build and depending on the given arguments,
 * runs a web server and watches for changes.
 *
 * @param {sequence[]} sequences - Array of sequences
 */
function exec(sequences, givenOptions) {
  var args = getProcessArguments();
  var make = generateMakeFunction(sequences);
  var options = _extends({}, defaultOptions(), givenOptions);

  var promise = make(options);

  if (args.watch) promise = continueIfBuildSucceeded(promise, function () {
    return (0, _watch2['default'])(make, options);
  });
  if (args.serve) promise = continueIfBuildSucceeded(promise, function () {
    return (0, _server2['default'])(options);
  });
}

/**
 * Metadata function, builds metadata object.
 * See `src/metadata` for what it actually does.
 *
 * @param {Object} [initial={}]
 */


/**
 * @private
 */
var defaultOptions = function defaultOptions() {
  return {
    buildDirectory: './build',
    sourceDirectory: './src',
    rootDirectory: __dirname,

    serverPort: 8080
  };
};

var getProcessArguments = function getProcessArguments() {
  return {
    serve: process.argv.includes('--serve'),
    watch: process.argv.includes('--watch')
  };
};

var generateMakeFunction = function generateMakeFunction(sequences) {
  return function (options) {
    console.log(_chalk2['default'].bold('Processing ...'));

    return execSequences(sequences, options).then(function () {
      console.log(_chalk2['default'].bold.green('Build successful!'));
      return { success: true };
    })['catch'](function (err) {
      console.log(_chalk2['default'].bold.red(err.stack || err));
      return { success: false };
    });
  };
};

var continueIfBuildSucceeded = function continueIfBuildSucceeded(promise, fn) {
  return promise.then(function (value) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === "object" && value.success === true) {
      return fn().then(function () {
        return value;
      });
    }

    return value;
  });
};

var execSequences = function execSequences(sequences, options) {
  var data = { priv: _extends({}, options, { root: options.rootDirectory }) };

  return sequences.reduce(function (promise, sequence) {
    return promise.then(function () {
      return sequence(data);
    });
  }, _bluebird2['default'].resolve([]));
};