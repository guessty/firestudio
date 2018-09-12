#!/usr/bin/env node
"use strict";

var _build = _interopRequireDefault(require("next/dist/build"));

var _export = _interopRequireDefault(require("next/dist/server/export"));

var _utils = require("next/dist/lib/utils");

var _path = _interopRequireDefault(require("path"));

var _cpx = _interopRequireDefault(require("cpx"));

var _fs = require("fs");

var _config = _interopRequireDefault(require("./../lib/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
var dir = _path.default.resolve('.');

var appDir = _path.default.join(dir, _config.default.appDir);

var functionsDir = _path.default.join(dir, _config.default.appDir);

var distDir = _path.default.join(dir, _config.default.distDir);

var nextConfig = _config.default.nextConfig; // Check if pages dir exists and warn if not

if (!(0, _fs.existsSync)(appDir)) {
  (0, _utils.printAndExit)("> No such directory exists as the project root: ".concat(appDir));
}

if (!(0, _fs.existsSync)(_path.default.join(appDir, 'pages'))) {
  if ((0, _fs.existsSync)(_path.default.join(appDir, '..', 'pages'))) {
    (0, _utils.printAndExit)('> No `pages` directory found. Did you mean to run `firestore build` in the parent (`../`) directory?');
  }

  (0, _utils.printAndExit)('> Couldn\'t find a `pages` directory. Please create one under the project root');
}

(0, _build.default)(appDir, nextConfig).then(function () {
  console.log('Build Successful');
  (0, _export.default)(appDir, {
    outdir: "".concat(distDir, "/public")
  }, nextConfig).then(function () {
    console.log('Export of Static Pages Successful');
    var routesSource = "".concat(appDir, "/config/routes.js");

    var functionsTemplateSource = _path.default.join(dir, 'node_modules/firestudio/dist/templates/functions/*.*');

    var customFunctionsSource = "".concat(functionsDir, "/*.*");
    var functionsDistDir = "".concat(distDir, "/functions");

    if (!(0, _fs.existsSync)(routesSource)) {
      (0, _utils.printAndExit)("> Cannot find routes config: ".concat(routesSource));
    }

    console.log(functionsTemplateSource);

    _cpx.default.copy(functionsTemplateSource, functionsDistDir, {}, function () {
      _cpx.default.copy(routesSource, "".concat(functionsDistDir, "/config"), {}, function () {
        _cpx.default.copy(customFunctionsSource, "".concat(functionsDistDir, "/functions"), {}, function () {
          (0, _utils.printAndExit)('Finished', 0);
        });
      });
    });
  }).catch(function (err) {
    (0, _utils.printAndExit)(err);
  });
}).catch(function (err) {
  (0, _utils.printAndExit)(err);
});