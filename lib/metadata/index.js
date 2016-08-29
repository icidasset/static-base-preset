'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function () {
  var initial = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

  return _bluebird2['default'].resolve(initial).then(_env2['default']);
};

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

;

/**
 * Metadata function, builds metadata object (e.g. data to pass to templates).
 * Stores node environment details.
 * See `src/metadata/env.js` for more info.
 *
 * @param {Object|Promise} [initial={}]
 */