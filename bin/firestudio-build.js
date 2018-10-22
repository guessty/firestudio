#!/usr/bin/env node
"use strict";

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _validate = _interopRequireDefault(require("./../lib/validate"));

var _config = _interopRequireDefault(require("./../lib/build/config"));

var _app = _interopRequireDefault(require("./../lib/build/app"));

var _functions = _interopRequireDefault(require("./../lib/build/functions"));

var _deploymentConfig = _interopRequireDefault(require("./../lib/build/deployment-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
var currentPath = _path.default.resolve('.');

function build(_x, _x2) {
  return _build.apply(this, arguments);
}

function _build() {
  _build = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(currentPath, config) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _validate.default)(currentPath, config);

          case 2:
            _context.next = 4;
            return (0, _app.default)(currentPath, config);

          case 4:
            _context.next = 6;
            return (0, _functions.default)(currentPath, config);

          case 6:
            _context.next = 8;
            return (0, _deploymentConfig.default)(currentPath, config);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _build.apply(this, arguments);
}

build(currentPath, _config.default);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iaW4vZmlyZXN0dWRpby1idWlsZC5qcyJdLCJuYW1lcyI6WyJjdXJyZW50UGF0aCIsInBhdGgiLCJyZXNvbHZlIiwiYnVpbGQiLCJjb25maWciXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUNBO0FBRUEsSUFBTUEsV0FBVyxHQUFHQyxjQUFLQyxPQUFMLENBQWEsR0FBYixDQUFwQjs7U0FFZUMsSzs7Ozs7Ozs0QkFBZixpQkFBc0JILFdBQXRCLEVBQW1DSSxNQUFuQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFDUSx1QkFBU0osV0FBVCxFQUFzQkksTUFBdEIsQ0FEUjs7QUFBQTtBQUFBO0FBQUEsbUJBRVEsa0JBQVNKLFdBQVQsRUFBc0JJLE1BQXRCLENBRlI7O0FBQUE7QUFBQTtBQUFBLG1CQUdRLHdCQUFlSixXQUFmLEVBQTRCSSxNQUE1QixDQUhSOztBQUFBO0FBQUE7QUFBQSxtQkFJUSwrQkFBc0JKLFdBQXRCLEVBQW1DSSxNQUFuQyxDQUpSOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUFPQUQsS0FBSyxDQUFDSCxXQUFELEVBQWNJLGVBQWQsQ0FBTCIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG4vL1xuaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vLi4vbGliL3ZhbGlkYXRlJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLy4uL2xpYi9idWlsZC9jb25maWcnXG5pbXBvcnQgYnVpbGRBcHAgZnJvbSAnLi8uLi9saWIvYnVpbGQvYXBwJ1xuaW1wb3J0IGJ1aWxkRnVuY3Rpb25zIGZyb20gJy4vLi4vbGliL2J1aWxkL2Z1bmN0aW9ucydcbmltcG9ydCBidWlsZERlcGxveW1lbnRDb25maWcgZnJvbSAnLi8uLi9saWIvYnVpbGQvZGVwbG95bWVudC1jb25maWcnXG4vL1xuXG5jb25zdCBjdXJyZW50UGF0aCA9IHBhdGgucmVzb2x2ZSgnLicpXG5cbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkIChjdXJyZW50UGF0aCwgY29uZmlnKSB7XG4gIGF3YWl0IHZhbGlkYXRlKGN1cnJlbnRQYXRoLCBjb25maWcpXG4gIGF3YWl0IGJ1aWxkQXBwKGN1cnJlbnRQYXRoLCBjb25maWcpXG4gIGF3YWl0IGJ1aWxkRnVuY3Rpb25zKGN1cnJlbnRQYXRoLCBjb25maWcpXG4gIGF3YWl0IGJ1aWxkRGVwbG95bWVudENvbmZpZyhjdXJyZW50UGF0aCwgY29uZmlnKVxufVxuXG5idWlsZChjdXJyZW50UGF0aCwgY29uZmlnKVxuIl19