'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = function (make, options) {
  var cwd = options.rootDirectory;
  var src = (0, _utils.cleanPath)(options.sourceDirectory);
  var pattern = src + '/**/*';

  _chokidar2['default'].watch(pattern, { cwd: cwd, ignoreInitial: true }).on('all', function (event, path) {
    console.log('{watch:' + event + '}', path);
    make(_extends({}, options, { changedPath: path }));
  });

  return _bluebird2['default'].resolve();
};

var _path = require('path');

var _utils = require('static-base/lib/utils');

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils2 = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }