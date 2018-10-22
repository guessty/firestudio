"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("next/dist/lib/utils");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
function validate(_x, _x2) {
  return _validate.apply(this, arguments);
}

function _validate() {
  _validate = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(currentPath, config) {
    var srcDir, appDir, pagesDir, routerSource, functionsDir;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            srcDir = _path.default.join(currentPath, 'src');
            appDir = _path.default.join(srcDir, 'app');
            pagesDir = _path.default.join(appDir, 'pages');
            routerSource = _path.default.join(appDir, 'router.js');
            functionsDir = _path.default.join(srcDir, 'functions'); // const pluginsDir = path.join(srcDir, 'plugins')
            // Check for '/src' directory in '<rootDir>'

            if (!(0, _fs.existsSync)(srcDir)) {
              (0, _utils.printAndExit)("> No '/src' directory found in poject root directory. Please create one to continue.");
            } // Check for '/app' directory  in '<rootDir>/src'


            if (!(0, _fs.existsSync)(appDir)) {
              (0, _utils.printAndExit)("> No '/app' directory found in '/src'. Please create one to continue.");
            } // Check for '/pages' directory in '<root>/src/app'


            if (!(0, _fs.existsSync)(pagesDir)) {
              if ((0, _fs.existsSync)(_path.default.join(appDir, '..', 'pages'))) {
                (0, _utils.printAndExit)("> No '/pages' directory found. Are you sure you're in the correct directory?");
              }

              (0, _utils.printAndExit)("> No '/pages' directory found in '/src/app'. Please create one to continue.");
            } // Check 'router.js' has been added in '<root>/src/app'


            if (!(0, _fs.existsSync)(routerSource)) {
              (0, _utils.printAndExit)("> Cannot find a router: ".concat(routerSource));
            } // Check for '/functions' directory in '<root>/src' if functions are enabled


            if ((0, _fs.existsSync)(functionsDir) && !(0, _fs.existsSync)(_path.default.join(functionsDir, 'index.js')) && !(0, _fs.existsSync)(_path.default.join(functionsDir, 'index.ts'))) {
              (0, _utils.printAndExit)("> No index file found in '/src/functions' directory. Please create one to continue.");
            } // // Check for '/plugins' directory in '<root>/src' if plugins are enabled
            // if (config.plugins.length && !existsSync(pluginsDir)) {
            //   printAndExit(`> No '/plugins' directory found in '/src'. Please create one to continue.`)
            // }


          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _validate.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvdmFsaWRhdGUuanMiXSwibmFtZXMiOlsidmFsaWRhdGUiLCJjdXJyZW50UGF0aCIsImNvbmZpZyIsInNyY0RpciIsInBhdGgiLCJqb2luIiwiYXBwRGlyIiwicGFnZXNEaXIiLCJyb3V0ZXJTb3VyY2UiLCJmdW5jdGlvbnNEaXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7OztBQUNBO1NBRThCQSxROzs7Ozs7OzRCQUFmLGlCQUF5QkMsV0FBekIsRUFBc0NDLE1BQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNQQyxZQUFBQSxNQURPLEdBQ0VDLGNBQUtDLElBQUwsQ0FBVUosV0FBVixFQUF1QixLQUF2QixDQURGO0FBRVBLLFlBQUFBLE1BRk8sR0FFRUYsY0FBS0MsSUFBTCxDQUFVRixNQUFWLEVBQWtCLEtBQWxCLENBRkY7QUFHUEksWUFBQUEsUUFITyxHQUdJSCxjQUFLQyxJQUFMLENBQVVDLE1BQVYsRUFBa0IsT0FBbEIsQ0FISjtBQUlQRSxZQUFBQSxZQUpPLEdBSVFKLGNBQUtDLElBQUwsQ0FBVUMsTUFBVixFQUFrQixXQUFsQixDQUpSO0FBS1BHLFlBQUFBLFlBTE8sR0FLUUwsY0FBS0MsSUFBTCxDQUFVRixNQUFWLEVBQWtCLFdBQWxCLENBTFIsRUFNYjtBQUVBOztBQUNBLGdCQUFJLENBQUMsb0JBQVdBLE1BQVgsQ0FBTCxFQUF5QjtBQUN2QjtBQUNELGFBWFksQ0FhYjs7O0FBQ0EsZ0JBQUksQ0FBQyxvQkFBV0csTUFBWCxDQUFMLEVBQXlCO0FBQ3ZCO0FBQ0QsYUFoQlksQ0FrQmI7OztBQUNBLGdCQUFJLENBQUMsb0JBQVdDLFFBQVgsQ0FBTCxFQUEyQjtBQUN6QixrQkFBSSxvQkFBV0gsY0FBS0MsSUFBTCxDQUFVQyxNQUFWLEVBQWtCLElBQWxCLEVBQXdCLE9BQXhCLENBQVgsQ0FBSixFQUFrRDtBQUNoRDtBQUNEOztBQUVEO0FBQ0QsYUF6QlksQ0EyQmI7OztBQUNBLGdCQUFJLENBQUMsb0JBQVdFLFlBQVgsQ0FBTCxFQUErQjtBQUM3Qix5RUFBd0NBLFlBQXhDO0FBQ0QsYUE5QlksQ0FnQ2I7OztBQUNBLGdCQUFJLG9CQUFXQyxZQUFYLEtBQ0MsQ0FBQyxvQkFBV0wsY0FBS0MsSUFBTCxDQUFVSSxZQUFWLEVBQXdCLFVBQXhCLENBQVgsQ0FERixJQUVDLENBQUMsb0JBQVdMLGNBQUtDLElBQUwsQ0FBVUksWUFBVixFQUF3QixVQUF4QixDQUFYLENBRk4sRUFHRTtBQUNBO0FBQ0QsYUF0Q1ksQ0F3Q2I7QUFDQTtBQUNBO0FBQ0E7OztBQTNDYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHByaW50QW5kRXhpdCB9IGZyb20gJ25leHQvZGlzdC9saWIvdXRpbHMnXG5pbXBvcnQgeyBleGlzdHNTeW5jIH0gZnJvbSAnZnMnXG4vL1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiB2YWxpZGF0ZSAoY3VycmVudFBhdGgsIGNvbmZpZykge1xuICBjb25zdCBzcmNEaXIgPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsICdzcmMnKVxuICBjb25zdCBhcHBEaXIgPSBwYXRoLmpvaW4oc3JjRGlyLCAnYXBwJylcbiAgY29uc3QgcGFnZXNEaXIgPSBwYXRoLmpvaW4oYXBwRGlyLCAncGFnZXMnKVxuICBjb25zdCByb3V0ZXJTb3VyY2UgPSBwYXRoLmpvaW4oYXBwRGlyLCAncm91dGVyLmpzJylcbiAgY29uc3QgZnVuY3Rpb25zRGlyID0gcGF0aC5qb2luKHNyY0RpciwgJ2Z1bmN0aW9ucycpXG4gIC8vIGNvbnN0IHBsdWdpbnNEaXIgPSBwYXRoLmpvaW4oc3JjRGlyLCAncGx1Z2lucycpXG5cbiAgLy8gQ2hlY2sgZm9yICcvc3JjJyBkaXJlY3RvcnkgaW4gJzxyb290RGlyPidcbiAgaWYgKCFleGlzdHNTeW5jKHNyY0RpcikpIHtcbiAgICBwcmludEFuZEV4aXQoYD4gTm8gJy9zcmMnIGRpcmVjdG9yeSBmb3VuZCBpbiBwb2plY3Qgcm9vdCBkaXJlY3RvcnkuIFBsZWFzZSBjcmVhdGUgb25lIHRvIGNvbnRpbnVlLmApXG4gIH1cblxuICAvLyBDaGVjayBmb3IgJy9hcHAnIGRpcmVjdG9yeSAgaW4gJzxyb290RGlyPi9zcmMnXG4gIGlmICghZXhpc3RzU3luYyhhcHBEaXIpKSB7XG4gICAgcHJpbnRBbmRFeGl0KGA+IE5vICcvYXBwJyBkaXJlY3RvcnkgZm91bmQgaW4gJy9zcmMnLiBQbGVhc2UgY3JlYXRlIG9uZSB0byBjb250aW51ZS5gKVxuICB9XG5cbiAgLy8gQ2hlY2sgZm9yICcvcGFnZXMnIGRpcmVjdG9yeSBpbiAnPHJvb3Q+L3NyYy9hcHAnXG4gIGlmICghZXhpc3RzU3luYyhwYWdlc0RpcikpIHtcbiAgICBpZiAoZXhpc3RzU3luYyhwYXRoLmpvaW4oYXBwRGlyLCAnLi4nLCAncGFnZXMnKSkpIHtcbiAgICAgIHByaW50QW5kRXhpdChgPiBObyAnL3BhZ2VzJyBkaXJlY3RvcnkgZm91bmQuIEFyZSB5b3Ugc3VyZSB5b3VcXCdyZSBpbiB0aGUgY29ycmVjdCBkaXJlY3Rvcnk/YClcbiAgICB9XG5cbiAgICBwcmludEFuZEV4aXQoYD4gTm8gJy9wYWdlcycgZGlyZWN0b3J5IGZvdW5kIGluICcvc3JjL2FwcCcuIFBsZWFzZSBjcmVhdGUgb25lIHRvIGNvbnRpbnVlLmApXG4gIH1cblxuICAvLyBDaGVjayAncm91dGVyLmpzJyBoYXMgYmVlbiBhZGRlZCBpbiAnPHJvb3Q+L3NyYy9hcHAnXG4gIGlmICghZXhpc3RzU3luYyhyb3V0ZXJTb3VyY2UpKSB7XG4gICAgcHJpbnRBbmRFeGl0KGA+IENhbm5vdCBmaW5kIGEgcm91dGVyOiAke3JvdXRlclNvdXJjZX1gKVxuICB9XG5cbiAgLy8gQ2hlY2sgZm9yICcvZnVuY3Rpb25zJyBkaXJlY3RvcnkgaW4gJzxyb290Pi9zcmMnIGlmIGZ1bmN0aW9ucyBhcmUgZW5hYmxlZFxuICBpZiAoZXhpc3RzU3luYyhmdW5jdGlvbnNEaXIpXG4gICAgJiYgIWV4aXN0c1N5bmMocGF0aC5qb2luKGZ1bmN0aW9uc0RpciwgJ2luZGV4LmpzJykpXG4gICAgJiYgIWV4aXN0c1N5bmMocGF0aC5qb2luKGZ1bmN0aW9uc0RpciwgJ2luZGV4LnRzJyApKVxuICApIHtcbiAgICBwcmludEFuZEV4aXQoYD4gTm8gaW5kZXggZmlsZSBmb3VuZCBpbiAnL3NyYy9mdW5jdGlvbnMnIGRpcmVjdG9yeS4gUGxlYXNlIGNyZWF0ZSBvbmUgdG8gY29udGludWUuYClcbiAgfVxuXG4gIC8vIC8vIENoZWNrIGZvciAnL3BsdWdpbnMnIGRpcmVjdG9yeSBpbiAnPHJvb3Q+L3NyYycgaWYgcGx1Z2lucyBhcmUgZW5hYmxlZFxuICAvLyBpZiAoY29uZmlnLnBsdWdpbnMubGVuZ3RoICYmICFleGlzdHNTeW5jKHBsdWdpbnNEaXIpKSB7XG4gIC8vICAgcHJpbnRBbmRFeGl0KGA+IE5vICcvcGx1Z2lucycgZGlyZWN0b3J5IGZvdW5kIGluICcvc3JjJy4gUGxlYXNlIGNyZWF0ZSBvbmUgdG8gY29udGludWUuYClcbiAgLy8gfVxufVxuXG4iXX0=