'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (options) {
  var app = (0, _express2['default'])();
  var buildDir = (0, _path.join)(options.rootDirectory, options.buildDirectory);

  app.use(_express2['default']['static'](buildDir));

  // handle not found
  app.use(function (req, res) {
    res.status(400).sendFile((0, _path.join)(buildDir, '404.html'));
  });

  // listen
  app.listen(options.serverPort, function () {
    console.log(_chalk2['default'].bold.magenta('Running static server at localhost:' + options.serverPort));
  });

  return _bluebird2['default'].resolve();
};

var _path = require('path');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }