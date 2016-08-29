'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = server;

var _path = require('path');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function server(options) {
  var app = (0, _express2['default'])();
  var buildDir = (0, _path.join)(options.rootDirectory, options.buildDirectory);

  // routes
  app.use(_express2['default']['static'](buildDir));
  app.use(function (_, res) {
    var status = options.clientSideRouting ? 200 : 404;

    res.status(status).sendFile((0, _path.join)(buildDir, status + '.html'));
  });

  // run
  app.listen(options.serverPort, function () {
    console.log(_chalk2['default'].bold.magenta('Running static server at localhost:' + options.serverPort));
  });

  // -- the end
  return _bluebird2['default'].resolve();
}