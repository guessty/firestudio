"use strict";

require("core-js/modules/web.dom.iterable");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var withTypescript = require('@zeit/next-typescript'); //


var dir = path.resolve('.');
var defaultConfig = {
  appDir: './src/app',
  functionsDir: './src/functions',
  distDir: './dist',
  nextConfig: {
    webpack: function webpack(config) {
      return config;
    }
  },
  firebaseConfig: {}
};
var configSource = path.join(dir, 'firestudio.config');
var appConfig = defaultConfig;

try {
  // appConfig = require.resolve(`${configSource}`)
  console.log(configSource);
  appConfig = require(configSource);
} catch (_unused) {
  console.log('Using default app config');
}

var config = _objectSpread({}, appConfig, {
  nextConfig: _objectSpread({}, defaultConfig.nextConfig, appConfig.nextConfig),
  firebaseConfig: _objectSpread({}, defaultConfig.firebaseConfig, appConfig.firebaseConfig)
});

var appDir = path.join(dir, config.appDir); // const routes = require.resolve(`${path.join(appDir, 'config/routes')}`)

var routes = require(path.join(appDir, 'config/routes'));

var withDefaults = function withDefaults(route) {
  return _objectSpread({
    prerender: true
  }, route);
};

var staticPathMap = routes.reduce(function (pathMap, route) {
  var routeWithDefaults = withDefaults(route);

  if (routeWithDefaults.prerender) {
    pathMap[routeWithDefaults.pattern] = {
      page: routeWithDefaults.page
    };
  }

  return pathMap;
}, {});

var nextConfig = _objectSpread({}, config.nextConfig, {
  dir: config.appDir,
  distDir: "./../../".concat(config.distDir, "/functions/app"),
  assetPrefix: '',
  exportPathMap: function exportPathMap() {
    return staticPathMap;
  }
});

module.exports = _objectSpread({}, config, {
  nextConfig: withTypescript(nextConfig)
});