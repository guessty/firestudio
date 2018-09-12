"use strict";

require("core-js/modules/web.dom.iterable");

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  firestudioApp: true
};
exports.firestudioApp = void 0;

var functions = _interopRequireWildcard(require("firebase-functions"));

var _functions = require("./functions");

Object.keys(_functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _functions[key];
    }
  });
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//
var libApp = require('firestudio/lib/app');

var libRouter = require('firestudio/lib/router');

var app = libApp({
  dev: false,
  conf: {
    distDir: 'app'
  }
});
var handler = libRouter.getRequestHandler(app);
var firestudioApp = functions.https.onRequest(function (request, response) {
  console.log('File: ' + request.originalUrl); // eslint-disable-line no-console

  return app.prepare().then(function () {
    return handler(request, response);
  });
});
exports.firestudioApp = firestudioApp;