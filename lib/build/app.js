"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildApp;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _build = _interopRequireDefault(require("next/dist/build"));

var _export = _interopRequireDefault(require("next/dist/export"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
function buildApp(_x, _x2) {
  return _buildApp.apply(this, arguments);
}

function _buildApp() {
  _buildApp = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(currentPath, config) {
    var appPath, publicDistPath;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            appPath = _path.default.join(currentPath, config.app.dir);
            publicDistPath = _path.default.join(currentPath, config.dist.public.dir);
            console.log('Building App...');
            _context.next = 5;
            return (0, _build.default)(appPath, config.app.next);

          case 5:
            console.log('Build Successful');
            console.log('Exporting Static Pages...');
            _context.next = 9;
            return (0, _export.default)(appPath, {
              outdir: publicDistPath
            }, config.app.next);

          case 9:
            console.log('Export Successful');

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _buildApp.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYnVpbGQvYXBwLmpzIl0sIm5hbWVzIjpbImJ1aWxkQXBwIiwiY3VycmVudFBhdGgiLCJjb25maWciLCJhcHBQYXRoIiwicGF0aCIsImpvaW4iLCJhcHAiLCJkaXIiLCJwdWJsaWNEaXN0UGF0aCIsImRpc3QiLCJwdWJsaWMiLCJjb25zb2xlIiwibG9nIiwibmV4dCIsIm91dGRpciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0FBQ0E7U0FFOEJBLFE7Ozs7Ozs7NEJBQWYsaUJBQXlCQyxXQUF6QixFQUFzQ0MsTUFBdEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ1BDLFlBQUFBLE9BRE8sR0FDR0MsY0FBS0MsSUFBTCxDQUFVSixXQUFWLEVBQXVCQyxNQUFNLENBQUNJLEdBQVAsQ0FBV0MsR0FBbEMsQ0FESDtBQUVQQyxZQUFBQSxjQUZPLEdBRVVKLGNBQUtDLElBQUwsQ0FBVUosV0FBVixFQUF1QkMsTUFBTSxDQUFDTyxJQUFQLENBQVlDLE1BQVosQ0FBbUJILEdBQTFDLENBRlY7QUFHYkksWUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksaUJBQVo7QUFIYTtBQUFBLG1CQUlQLG9CQUFNVCxPQUFOLEVBQWVELE1BQU0sQ0FBQ0ksR0FBUCxDQUFXTyxJQUExQixDQUpPOztBQUFBO0FBS2JGLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLGtCQUFaO0FBQ0FELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLDJCQUFaO0FBTmE7QUFBQSxtQkFPUCxxQkFBVVQsT0FBVixFQUFtQjtBQUFFVyxjQUFBQSxNQUFNLEVBQUVOO0FBQVYsYUFBbkIsRUFBK0NOLE1BQU0sQ0FBQ0ksR0FBUCxDQUFXTyxJQUExRCxDQVBPOztBQUFBO0FBUWJGLFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLG1CQUFaOztBQVJhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnVpbGQgZnJvbSAnbmV4dC9kaXN0L2J1aWxkJ1xuaW1wb3J0IGV4cG9ydEFwcCBmcm9tICduZXh0L2Rpc3QvZXhwb3J0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbi8vXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQXBwIChjdXJyZW50UGF0aCwgY29uZmlnKSB7XG4gIGNvbnN0IGFwcFBhdGggPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsIGNvbmZpZy5hcHAuZGlyKVxuICBjb25zdCBwdWJsaWNEaXN0UGF0aCA9IHBhdGguam9pbihjdXJyZW50UGF0aCwgY29uZmlnLmRpc3QucHVibGljLmRpcilcbiAgY29uc29sZS5sb2coJ0J1aWxkaW5nIEFwcC4uLicpXG4gIGF3YWl0IGJ1aWxkKGFwcFBhdGgsIGNvbmZpZy5hcHAubmV4dClcbiAgY29uc29sZS5sb2coJ0J1aWxkIFN1Y2Nlc3NmdWwnKVxuICBjb25zb2xlLmxvZygnRXhwb3J0aW5nIFN0YXRpYyBQYWdlcy4uLicpXG4gIGF3YWl0IGV4cG9ydEFwcChhcHBQYXRoLCB7IG91dGRpcjogcHVibGljRGlzdFBhdGggfSwgY29uZmlnLmFwcC5uZXh0KVxuICBjb25zb2xlLmxvZygnRXhwb3J0IFN1Y2Nlc3NmdWwnKVxufSJdfQ==