"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFunctions;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
function buildFunctions(_x, _x2) {
  return _buildFunctions.apply(this, arguments);
}

function _buildFunctions() {
  _buildFunctions = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(functionsDir, functionsDistDir) {
    var functionsJSEntry, functionsTSEntry, entry;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            functionsJSEntry = "".concat(functionsDir, "/index.js");
            functionsTSEntry = "".concat(functionsDir, "/index.ts");
            entry = undefined;

            if ((0, _fs.existsSync)(functionsTSEntry)) {
              entry = functionsTSEntry;
            } else if ((0, _fs.existsSync)(functionsJSEntry)) {
              entry = functionsJSEntry;
            }

            if (!(entry !== undefined)) {
              _context2.next = 16;
              break;
            }

            _context2.prev = 5;
            _context2.next = 8;
            return runCompiler({
              entry: entry,
              devtool: 'inline-source-map',
              module: {
                rules: [{
                  test: /\.tsx?$/,
                  use: require.resolve('ts-loader'),
                  exclude: /node_modules/
                }]
              },
              resolve: {
                extensions: ['.tsx', '.ts', '.js']
              },
              output: {
                filename: 'index.js',
                path: _path.default.join(functionsDistDir, 'functions')
              }
            });

          case 8:
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](5);
            console.error("> Failed to build");
            throw _context2.t0;

          case 14:
            _context2.next = 17;
            break;

          case 16:
            console.error("> No custom functions found");

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[5, 10]]);
  }));
  return _buildFunctions.apply(this, arguments);
}

function runCompiler(webpackConfig) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(resolve, reject) {
      var webpackCompiler;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _webpack.default)(webpackConfig);

            case 2:
              webpackCompiler = _context.sent;
              webpackCompiler.run(function (err, stats) {
                if (err) return reject(err);
                var jsonStats = stats.toJson('errors-only');

                if (jsonStats.errors.length > 0) {
                  var error = new Error(jsonStats.errors[0]);
                  error.errors = jsonStats.errors;
                  error.warnings = jsonStats.warnings;
                  return reject(error);
                }

                resolve();
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }());
}