'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function () {
  var initial = arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0];

  return _bluebird2['default'].resolve(initial).then(_env2['default']).then(_webpack2['default']);
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _env = require('./env');

var _env2 = _interopRequireDefault(_env);

var _webpack = require('./webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }