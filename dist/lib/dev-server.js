"use strict";

var _path = _interopRequireDefault(require("path"));

var _http = require("http");

var _app = _interopRequireDefault(require("./app"));

var _config = _interopRequireDefault(require("./config"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
module.exports = function (dir) {
  var nextDir = _path.default.join(dir, _config.default.appDir);

  var port = parseInt(process.env.PORT, 10) || 3000;
  var dev = process.env.NODE_ENV !== 'production';
  var app = (0, _app.default)({
    dir: nextDir,
    dev: dev,
    conf: _config.default
  });

  var handler = _router.default.getRequestHandler(app);

  app.prepare().then(function () {
    (0, _http.createServer)(handler).listen(port, function (err) {
      if (err) throw err;
      console.log("> Ready on http://localhost:".concat(port));
    });
  }).catch(function (error) {
    console.log('error', error);
  });
};