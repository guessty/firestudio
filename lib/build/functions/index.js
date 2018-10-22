"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFunctions;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _cpx = _interopRequireDefault(require("cpx"));

var _webpackBuild = _interopRequireDefault(require("./webpack-build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var copyFiles = function copyFiles(currentPath, appPath, functionsDistPath) {
  return new Promise(function (resolve) {
    var routerPath = _path.default.join(appPath, 'router.js');

    var functionsTemplateSource = _path.default.join(currentPath, 'node_modules/firestudio/lib/build/functions/template/*.*');

    console.log('Copying Files...');

    _cpx.default.copy("".concat(currentPath, "/package.json"), functionsDistPath, {}, function () {
      _cpx.default.copy("".concat(currentPath, "/package-lock.json"), functionsDistPath, {}, function () {
        _cpx.default.copy(functionsTemplateSource, functionsDistPath, {}, function () {
          _cpx.default.copy(routerPath, "".concat(functionsDistPath), {}, function () {
            console.log('Files copied');
            resolve();
          });
        });
      });
    });
  });
};

function buildFunctions(_x, _x2) {
  return _buildFunctions.apply(this, arguments);
}

function _buildFunctions() {
  _buildFunctions = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(currentPath, config) {
    var dev,
        appPath,
        functionsDistPath,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dev = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            appPath = _path.default.join(currentPath, config.app.dir);
            functionsDistPath = dev ? _path.default.join(currentPath, 'tmp/functions') : _path.default.join(currentPath, config.dist.functions.dir);
            console.log('Building Functions...');
            _context.next = 6;
            return copyFiles(currentPath, appPath, functionsDistPath);

          case 6:
            _context.next = 8;
            return (0, _webpackBuild.default)(config.functions.dir, functionsDistPath);

          case 8:
            console.log('Functions Built.');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _buildFunctions.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYnVpbGQvZnVuY3Rpb25zL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvcHlGaWxlcyIsImN1cnJlbnRQYXRoIiwiYXBwUGF0aCIsImZ1bmN0aW9uc0Rpc3RQYXRoIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyb3V0ZXJQYXRoIiwicGF0aCIsImpvaW4iLCJmdW5jdGlvbnNUZW1wbGF0ZVNvdXJjZSIsImNvbnNvbGUiLCJsb2ciLCJjcHgiLCJjb3B5IiwiYnVpbGRGdW5jdGlvbnMiLCJjb25maWciLCJkZXYiLCJhcHAiLCJkaXIiLCJkaXN0IiwiZnVuY3Rpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7QUFFQSxJQUFNQSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDQyxXQUFELEVBQWNDLE9BQWQsRUFBdUJDLGlCQUF2QjtBQUFBLFNBQTZDLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDdEYsUUFBTUMsVUFBVSxHQUFHQyxjQUFLQyxJQUFMLENBQVVOLE9BQVYsRUFBbUIsV0FBbkIsQ0FBbkI7O0FBQ0EsUUFBTU8sdUJBQXVCLEdBQUdGLGNBQUtDLElBQUwsQ0FBVVAsV0FBVixFQUF1QiwwREFBdkIsQ0FBaEM7O0FBRUFTLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaOztBQUNBQyxpQkFBSUMsSUFBSixXQUFZWixXQUFaLG9CQUF3Q0UsaUJBQXhDLEVBQTJELEVBQTNELEVBQStELFlBQU07QUFDbkVTLG1CQUFJQyxJQUFKLFdBQVlaLFdBQVoseUJBQTZDRSxpQkFBN0MsRUFBZ0UsRUFBaEUsRUFBb0UsWUFBTTtBQUN4RVMscUJBQUlDLElBQUosQ0FBU0osdUJBQVQsRUFBa0NOLGlCQUFsQyxFQUFxRCxFQUFyRCxFQUF5RCxZQUFNO0FBQzdEUyx1QkFBSUMsSUFBSixDQUFTUCxVQUFULFlBQXdCSCxpQkFBeEIsR0FBNkMsRUFBN0MsRUFBaUQsWUFBTTtBQUNyRE8sWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksY0FBWjtBQUNBTixZQUFBQSxPQUFPO0FBQ1IsV0FIRDtBQUlELFNBTEQ7QUFNRCxPQVBEO0FBUUQsS0FURDtBQVVELEdBZjhELENBQTdDO0FBQUEsQ0FBbEI7O1NBaUI4QlMsYzs7Ozs7Ozs0QkFBZixpQkFBK0JiLFdBQS9CLEVBQTRDYyxNQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBb0RDLFlBQUFBLEdBQXBELDJEQUEwRCxLQUExRDtBQUNQZCxZQUFBQSxPQURPLEdBQ0dLLGNBQUtDLElBQUwsQ0FBVVAsV0FBVixFQUF1QmMsTUFBTSxDQUFDRSxHQUFQLENBQVdDLEdBQWxDLENBREg7QUFFUGYsWUFBQUEsaUJBRk8sR0FFYWEsR0FBRyxHQUN6QlQsY0FBS0MsSUFBTCxDQUFVUCxXQUFWLEVBQXVCLGVBQXZCLENBRHlCLEdBRXpCTSxjQUFLQyxJQUFMLENBQVVQLFdBQVYsRUFBdUJjLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZQyxTQUFaLENBQXNCRixHQUE3QyxDQUpTO0FBS2JSLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHVCQUFaO0FBTGE7QUFBQSxtQkFNUFgsU0FBUyxDQUFDQyxXQUFELEVBQWNDLE9BQWQsRUFBdUJDLGlCQUF2QixDQU5GOztBQUFBO0FBQUE7QUFBQSxtQkFPUCwyQkFBYVksTUFBTSxDQUFDSyxTQUFQLENBQWlCRixHQUE5QixFQUFtQ2YsaUJBQW5DLENBUE87O0FBQUE7QUFRYk8sWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksa0JBQVo7O0FBUmE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgY3B4IGZyb20gJ2NweCdcbi8vXG5pbXBvcnQgd2VicGFja0J1aWxkIGZyb20gJy4vd2VicGFjay1idWlsZCdcblxuY29uc3QgY29weUZpbGVzID0gKGN1cnJlbnRQYXRoLCBhcHBQYXRoLCBmdW5jdGlvbnNEaXN0UGF0aCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgY29uc3Qgcm91dGVyUGF0aCA9IHBhdGguam9pbihhcHBQYXRoLCAncm91dGVyLmpzJylcbiAgY29uc3QgZnVuY3Rpb25zVGVtcGxhdGVTb3VyY2UgPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsICdub2RlX21vZHVsZXMvZmlyZXN0dWRpby9saWIvYnVpbGQvZnVuY3Rpb25zL3RlbXBsYXRlLyouKicpXG5cbiAgY29uc29sZS5sb2coJ0NvcHlpbmcgRmlsZXMuLi4nKVxuICBjcHguY29weShgJHtjdXJyZW50UGF0aH0vcGFja2FnZS5qc29uYCwgZnVuY3Rpb25zRGlzdFBhdGgsIHt9LCAoKSA9PiB7XG4gICAgY3B4LmNvcHkoYCR7Y3VycmVudFBhdGh9L3BhY2thZ2UtbG9jay5qc29uYCwgZnVuY3Rpb25zRGlzdFBhdGgsIHt9LCAoKSA9PiB7XG4gICAgICBjcHguY29weShmdW5jdGlvbnNUZW1wbGF0ZVNvdXJjZSwgZnVuY3Rpb25zRGlzdFBhdGgsIHt9LCAoKSA9PiB7XG4gICAgICAgIGNweC5jb3B5KHJvdXRlclBhdGgsIGAke2Z1bmN0aW9uc0Rpc3RQYXRofWAsIHt9LCAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ0ZpbGVzIGNvcGllZCcpXG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufSlcblxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gYnVpbGRGdW5jdGlvbnMgKGN1cnJlbnRQYXRoLCBjb25maWcsIGRldiA9IGZhbHNlKSB7XG4gIGNvbnN0IGFwcFBhdGggPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsIGNvbmZpZy5hcHAuZGlyKVxuICBjb25zdCBmdW5jdGlvbnNEaXN0UGF0aCA9IGRldlxuICAgID8gcGF0aC5qb2luKGN1cnJlbnRQYXRoLCAndG1wL2Z1bmN0aW9ucycpXG4gICAgOiBwYXRoLmpvaW4oY3VycmVudFBhdGgsIGNvbmZpZy5kaXN0LmZ1bmN0aW9ucy5kaXIpXG4gIGNvbnNvbGUubG9nKCdCdWlsZGluZyBGdW5jdGlvbnMuLi4nKVxuICBhd2FpdCBjb3B5RmlsZXMoY3VycmVudFBhdGgsIGFwcFBhdGgsIGZ1bmN0aW9uc0Rpc3RQYXRoKVxuICBhd2FpdCB3ZWJwYWNrQnVpbGQoY29uZmlnLmZ1bmN0aW9ucy5kaXIsIGZ1bmN0aW9uc0Rpc3RQYXRoKVxuICBjb25zb2xlLmxvZygnRnVuY3Rpb25zIEJ1aWx0LicpXG59Il19