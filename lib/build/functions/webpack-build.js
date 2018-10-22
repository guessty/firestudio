"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = webpackBuild;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _webpackNodeExternals = _interopRequireDefault(require("webpack-node-externals"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
function webpackBuild(_x, _x2) {
  return _webpackBuild.apply(this, arguments);
}

function _webpackBuild() {
  _webpackBuild = _asyncToGenerator(
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
              target: 'node',
              // in order to ignore built-in modules like path, fs, etc.
              externals: [(0, _webpackNodeExternals.default)()],
              // in order to ignore all modules in node_modules folder
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
                libraryTarget: 'umd',
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
  return _webpackBuild.apply(this, arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVpbGQvZnVuY3Rpb25zL3dlYnBhY2stYnVpbGQuanMiXSwibmFtZXMiOlsid2VicGFja0J1aWxkIiwiZnVuY3Rpb25zRGlyIiwiZnVuY3Rpb25zRGlzdERpciIsImZ1bmN0aW9uc0pTRW50cnkiLCJmdW5jdGlvbnNUU0VudHJ5IiwiZW50cnkiLCJ1bmRlZmluZWQiLCJydW5Db21waWxlciIsImRldnRvb2wiLCJ0YXJnZXQiLCJleHRlcm5hbHMiLCJtb2R1bGUiLCJydWxlcyIsInRlc3QiLCJ1c2UiLCJyZXF1aXJlIiwicmVzb2x2ZSIsImV4Y2x1ZGUiLCJleHRlbnNpb25zIiwib3V0cHV0IiwibGlicmFyeVRhcmdldCIsImZpbGVuYW1lIiwicGF0aCIsImpvaW4iLCJjb25zb2xlIiwiZXJyb3IiLCJ3ZWJwYWNrQ29uZmlnIiwiUHJvbWlzZSIsInJlamVjdCIsIndlYnBhY2tDb21waWxlciIsInJ1biIsImVyciIsInN0YXRzIiwianNvblN0YXRzIiwidG9Kc29uIiwiZXJyb3JzIiwibGVuZ3RoIiwiRXJyb3IiLCJ3YXJuaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7U0FFOEJBLFk7Ozs7Ozs7NEJBQWYsa0JBQTZCQyxZQUE3QixFQUEyQ0MsZ0JBQTNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyxZQUFBQSxnQkFETyxhQUNlRixZQURmO0FBRVBHLFlBQUFBLGdCQUZPLGFBRWVILFlBRmY7QUFHVEksWUFBQUEsS0FIUyxHQUdEQyxTQUhDOztBQUtiLGdCQUFJLG9CQUFXRixnQkFBWCxDQUFKLEVBQWtDO0FBQ2hDQyxjQUFBQSxLQUFLLEdBQUdELGdCQUFSO0FBQ0QsYUFGRCxNQUVPLElBQUksb0JBQVdELGdCQUFYLENBQUosRUFBa0M7QUFDdkNFLGNBQUFBLEtBQUssR0FBR0YsZ0JBQVI7QUFDRDs7QUFUWSxrQkFXVEUsS0FBSyxLQUFLQyxTQVhEO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxtQkFhSEMsV0FBVyxDQUFDO0FBQ2hCRixjQUFBQSxLQUFLLEVBQUVBLEtBRFM7QUFFaEJHLGNBQUFBLE9BQU8sRUFBRSxtQkFGTztBQUdoQkMsY0FBQUEsTUFBTSxFQUFFLE1BSFE7QUFHQTtBQUNoQkMsY0FBQUEsU0FBUyxFQUFFLENBQUMsb0NBQUQsQ0FKSztBQUljO0FBQzlCQyxjQUFBQSxNQUFNLEVBQUU7QUFDTkMsZ0JBQUFBLEtBQUssRUFBRSxDQUNMO0FBQ0VDLGtCQUFBQSxJQUFJLEVBQUUsU0FEUjtBQUVFQyxrQkFBQUEsR0FBRyxFQUFFQyxPQUFPLENBQUNDLE9BQVIsQ0FBZ0IsV0FBaEIsQ0FGUDtBQUdFQyxrQkFBQUEsT0FBTyxFQUFFO0FBSFgsaUJBREs7QUFERCxlQUxRO0FBY2hCRCxjQUFBQSxPQUFPLEVBQUU7QUFDUEUsZ0JBQUFBLFVBQVUsRUFBRSxDQUFFLE1BQUYsRUFBVSxLQUFWLEVBQWlCLEtBQWpCO0FBREwsZUFkTztBQWlCaEJDLGNBQUFBLE1BQU0sRUFBRTtBQUNOQyxnQkFBQUEsYUFBYSxFQUFFLEtBRFQ7QUFFTkMsZ0JBQUFBLFFBQVEsRUFBRSxVQUZKO0FBR05DLGdCQUFBQSxJQUFJLEVBQUVBLGNBQUtDLElBQUwsQ0FBVXJCLGdCQUFWLEVBQTRCLFdBQTVCO0FBSEE7QUFqQlEsYUFBRCxDQWJSOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFxQ1RzQixZQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFyQ1M7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBeUNYRCxZQUFBQSxPQUFPLENBQUNDLEtBQVI7O0FBekNXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEc7Ozs7QUE2Q2YsU0FBU2xCLFdBQVQsQ0FBc0JtQixhQUF0QixFQUFxQztBQUNuQyxTQUFPLElBQUlDLE9BQUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDhCQUFZLGlCQUFPWCxPQUFQLEVBQWdCWSxNQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUNhLHNCQUFRRixhQUFSLENBRGI7O0FBQUE7QUFDWEcsY0FBQUEsZUFEVztBQUVqQkEsY0FBQUEsZUFBZSxDQUFDQyxHQUFoQixDQUFvQixVQUFDQyxHQUFELEVBQU1DLEtBQU4sRUFBZ0I7QUFDbEMsb0JBQUlELEdBQUosRUFBUyxPQUFPSCxNQUFNLENBQUNHLEdBQUQsQ0FBYjtBQUVULG9CQUFNRSxTQUFTLEdBQUdELEtBQUssQ0FBQ0UsTUFBTixDQUFhLGFBQWIsQ0FBbEI7O0FBRUEsb0JBQUlELFNBQVMsQ0FBQ0UsTUFBVixDQUFpQkMsTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0Isc0JBQU1YLEtBQUssR0FBRyxJQUFJWSxLQUFKLENBQVVKLFNBQVMsQ0FBQ0UsTUFBVixDQUFpQixDQUFqQixDQUFWLENBQWQ7QUFDQVYsa0JBQUFBLEtBQUssQ0FBQ1UsTUFBTixHQUFlRixTQUFTLENBQUNFLE1BQXpCO0FBQ0FWLGtCQUFBQSxLQUFLLENBQUNhLFFBQU4sR0FBaUJMLFNBQVMsQ0FBQ0ssUUFBM0I7QUFDQSx5QkFBT1YsTUFBTSxDQUFDSCxLQUFELENBQWI7QUFDRDs7QUFFRFQsZ0JBQUFBLE9BQU87QUFDUixlQWJEOztBQUZpQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUFaOztBQUFBO0FBQUE7QUFBQTtBQUFBLE1BQVA7QUFpQkQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VicGFjayBmcm9tICd3ZWJwYWNrJ1xuaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBub2RlRXh0ZXJuYWxzIGZyb20gJ3dlYnBhY2stbm9kZS1leHRlcm5hbHMnXG4vL1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiB3ZWJwYWNrQnVpbGQgKGZ1bmN0aW9uc0RpciwgZnVuY3Rpb25zRGlzdERpcikge1xuICBjb25zdCBmdW5jdGlvbnNKU0VudHJ5ID0gYCR7ZnVuY3Rpb25zRGlyfS9pbmRleC5qc2BcbiAgY29uc3QgZnVuY3Rpb25zVFNFbnRyeSA9IGAke2Z1bmN0aW9uc0Rpcn0vaW5kZXgudHNgXG4gIGxldCBlbnRyeSA9IHVuZGVmaW5lZFxuXG4gIGlmIChleGlzdHNTeW5jKGZ1bmN0aW9uc1RTRW50cnkpKSB7XG4gICAgZW50cnkgPSBmdW5jdGlvbnNUU0VudHJ5XG4gIH0gZWxzZSBpZiAoZXhpc3RzU3luYyhmdW5jdGlvbnNKU0VudHJ5KSkge1xuICAgIGVudHJ5ID0gZnVuY3Rpb25zSlNFbnRyeVxuICB9XG5cbiAgaWYgKGVudHJ5ICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcnVuQ29tcGlsZXIoe1xuICAgICAgICBlbnRyeTogZW50cnksXG4gICAgICAgIGRldnRvb2w6ICdpbmxpbmUtc291cmNlLW1hcCcsXG4gICAgICAgIHRhcmdldDogJ25vZGUnLCAvLyBpbiBvcmRlciB0byBpZ25vcmUgYnVpbHQtaW4gbW9kdWxlcyBsaWtlIHBhdGgsIGZzLCBldGMuXG4gICAgICAgIGV4dGVybmFsczogW25vZGVFeHRlcm5hbHMoKV0sIC8vIGluIG9yZGVyIHRvIGlnbm9yZSBhbGwgbW9kdWxlcyBpbiBub2RlX21vZHVsZXMgZm9sZGVyXG4gICAgICAgIG1vZHVsZToge1xuICAgICAgICAgIHJ1bGVzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRlc3Q6IC9cXC50c3g/JC8sXG4gICAgICAgICAgICAgIHVzZTogcmVxdWlyZS5yZXNvbHZlKCd0cy1sb2FkZXInKSxcbiAgICAgICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICBleHRlbnNpb25zOiBbICcudHN4JywgJy50cycsICcuanMnIF1cbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgbGlicmFyeVRhcmdldDogJ3VtZCcsXG4gICAgICAgICAgZmlsZW5hbWU6ICdpbmRleC5qcycsXG4gICAgICAgICAgcGF0aDogcGF0aC5qb2luKGZ1bmN0aW9uc0Rpc3REaXIsICdmdW5jdGlvbnMnKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihgPiBGYWlsZWQgdG8gYnVpbGRgKVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUuZXJyb3IoYD4gTm8gY3VzdG9tIGZ1bmN0aW9ucyBmb3VuZGApXG4gIH1cbn1cblxuZnVuY3Rpb24gcnVuQ29tcGlsZXIgKHdlYnBhY2tDb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB3ZWJwYWNrQ29tcGlsZXIgPSBhd2FpdCB3ZWJwYWNrKHdlYnBhY2tDb25maWcpXG4gICAgd2VicGFja0NvbXBpbGVyLnJ1bigoZXJyLCBzdGF0cykgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIHJlamVjdChlcnIpXG5cbiAgICAgIGNvbnN0IGpzb25TdGF0cyA9IHN0YXRzLnRvSnNvbignZXJyb3JzLW9ubHknKVxuXG4gICAgICBpZiAoanNvblN0YXRzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGpzb25TdGF0cy5lcnJvcnNbMF0pXG4gICAgICAgIGVycm9yLmVycm9ycyA9IGpzb25TdGF0cy5lcnJvcnNcbiAgICAgICAgZXJyb3Iud2FybmluZ3MgPSBqc29uU3RhdHMud2FybmluZ3NcbiAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcilcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSlcbiAgfSlcbn1cbiJdfQ==