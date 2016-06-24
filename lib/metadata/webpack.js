'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * @private
 *
 * Adds:
 * e.g. { assets: { 'application.js': ... } }
 */

exports['default'] = function (data) {
  var assets = {};

  (data.assets || []).forEach(function (f) {
    var assetname = f.basename.split('.')[0];
    assets['' + assetname + f.extname] = f;
  });

  return _extends({}, data, { assets: assets });
};