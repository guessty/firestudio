"use strict";

var _next = _interopRequireDefault(require("next"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
module.exports = function (_ref) {
  var dir = _ref.dir,
      dev = _ref.dev;
  return (0, _next.default)({
    dir: dir,
    dev: dev,
    conf: _config.default.nextConfig
  });
};