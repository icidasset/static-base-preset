'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runWithMessageAndLimiter = exports.isProductionEnv = exports.isDevelopmentEnv = exports.isEnv = void 0;

var _staticBase = require('static-base');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var isEnv = exports.isEnv = function isEnv(env) {
  return process.env.ENV === env;
};
var isDevelopmentEnv = exports.isDevelopmentEnv = function isDevelopmentEnv() {
  return isEnv('development');
};
var isProductionEnv = exports.isProductionEnv = function isProductionEnv() {
  return isEnv('production');
};

/**
 * The `static-base.run` function with a limiter and messenger installed.
 * The last function accepts an object instead of the usual stuff.
 * If the limiter (e.g. `changedPath` from watcher)
 * matches the given pattern then it continues,
 * otherwise it returns a Promise with an empty array.
 *
 * __How to use:__
 *
 * ```
 * const message = 'Building pages';
 * const limiter = 'src/pages/example.hbs';
 * const sequenceItems = [read];
 * const pattern = 'src/pages/*.hbs';
 * const rootDir = __dirname;
 *
 * runWithMessageAndLimiter
 *   (message)
 *   (limiter)
 *   (...sequenceItems)
 *   (pattern, rootDir)
 * ```
 */
var runWithMessageAndLimiter = exports.runWithMessageAndLimiter = function runWithMessageAndLimiter(msg) {
  return function (limiter, limiterPattern) {
    return function () {
      for (var _len = arguments.length, sequenceItems = Array(_len), _key = 0; _key < _len; _key++) {
        sequenceItems[_key] = arguments[_key];
      }

      return function () {
        var pattern = limiterPattern || (typeof (arguments.length <= 0 ? void 0 : arguments[0]) === 'string' ? arguments.length <= 0 ? void 0 : arguments[0] : void 0);

        if (!limiter || pattern && (0, _minimatch2['default'])(limiter, pattern)) {
          console.log(_chalk2['default'].bold.yellow(msg));
          return _staticBase.run.apply(void 0, sequenceItems).apply(void 0, arguments);
        }

        return _bluebird2['default'].resolve([]);
      };
    };
  };
};