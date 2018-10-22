"use strict";

require("core-js/modules/web.dom.iterable");

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _app = _interopRequireDefault(require("./app"));

var _config = _interopRequireDefault(require("./build/config"));

var _functions = _interopRequireDefault(require("./build/functions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requireFoolWebpack = require('require-fool-webpack'); //


module.exports = function (currentPath) {
  var functionsDistDir = _path.default.join(currentPath, 'tmp');

  (0, _functions.default)(currentPath, _config.default, true).then(function () {
    var nextDir = _path.default.join(currentPath, _config.default.app.dir);

    var router = requireFoolWebpack(_path.default.join(nextDir, 'router'));
    var port = parseInt(process.env.PORT, 10) || 3000;
    var app = (0, _app.default)({
      dev: true,
      dir: nextDir,
      conf: _objectSpread({}, _config.default.app.next, {
        distDir: "./../../tmp/app"
      })
    });
    var handler = router.getRequestHandler(app);
    var customFunctions = requireFoolWebpack("".concat(functionsDistDir, "/functions"));
    var customFunctionsKeys = Object.keys(customFunctions) || [];
    app.prepare().then(function () {
      var server = (0, _express.default)();
      customFunctionsKeys.forEach(function (key) {
        server.all("/api/functions/".concat(key), customFunctions[key]);
      });
      server.get('*', function (req, res) {
        return handler(req, res);
      });
      server.listen(port, function (err) {
        if (err) throw err;
        console.log("> Ready on http://localhost:".concat(port));
      });
    }).catch(function (error) {
      console.log('error', error);
    });
  });
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvZGV2LXNlcnZlci5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlRm9vbFdlYnBhY2siLCJyZXF1aXJlIiwibW9kdWxlIiwiZXhwb3J0cyIsImN1cnJlbnRQYXRoIiwiZnVuY3Rpb25zRGlzdERpciIsInBhdGgiLCJqb2luIiwiY29uZmlnIiwidGhlbiIsIm5leHREaXIiLCJhcHAiLCJkaXIiLCJyb3V0ZXIiLCJwb3J0IiwicGFyc2VJbnQiLCJwcm9jZXNzIiwiZW52IiwiUE9SVCIsImRldiIsImNvbmYiLCJuZXh0IiwiZGlzdERpciIsImhhbmRsZXIiLCJnZXRSZXF1ZXN0SGFuZGxlciIsImN1c3RvbUZ1bmN0aW9ucyIsImN1c3RvbUZ1bmN0aW9uc0tleXMiLCJPYmplY3QiLCJrZXlzIiwicHJlcGFyZSIsInNlcnZlciIsImZvckVhY2giLCJrZXkiLCJhbGwiLCJnZXQiLCJyZXEiLCJyZXMiLCJsaXN0ZW4iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJlcnJvciJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7Ozs7OztBQUpBLElBQU1BLGtCQUFrQixHQUFHQyxPQUFPLENBQUMsc0JBQUQsQ0FBbEMsQyxDQUNBOzs7QUFLQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCLFVBQUNDLFdBQUQsRUFBaUI7QUFDaEMsTUFBTUMsZ0JBQWdCLEdBQUdDLGNBQUtDLElBQUwsQ0FBVUgsV0FBVixFQUF1QixLQUF2QixDQUF6Qjs7QUFFQSwwQkFBZUEsV0FBZixFQUE0QkksZUFBNUIsRUFBb0MsSUFBcEMsRUFDR0MsSUFESCxDQUNRLFlBQU07QUFDVixRQUFNQyxPQUFPLEdBQUdKLGNBQUtDLElBQUwsQ0FBVUgsV0FBVixFQUF1QkksZ0JBQU9HLEdBQVAsQ0FBV0MsR0FBbEMsQ0FBaEI7O0FBQ0EsUUFBTUMsTUFBTSxHQUFHYixrQkFBa0IsQ0FBQ00sY0FBS0MsSUFBTCxDQUFVRyxPQUFWLEVBQW1CLFFBQW5CLENBQUQsQ0FBakM7QUFDQSxRQUFNSSxJQUFJLEdBQUdDLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxHQUFSLENBQVlDLElBQWIsRUFBbUIsRUFBbkIsQ0FBUixJQUFrQyxJQUEvQztBQUNBLFFBQU1QLEdBQUcsR0FBRyxrQkFBYztBQUN4QlEsTUFBQUEsR0FBRyxFQUFFLElBRG1CO0FBRXhCUCxNQUFBQSxHQUFHLEVBQUVGLE9BRm1CO0FBR3hCVSxNQUFBQSxJQUFJLG9CQUFNWixnQkFBT0csR0FBUCxDQUFXVSxJQUFqQjtBQUF1QkMsUUFBQUEsT0FBTztBQUE5QjtBQUhvQixLQUFkLENBQVo7QUFLQSxRQUFNQyxPQUFPLEdBQUdWLE1BQU0sQ0FBQ1csaUJBQVAsQ0FBeUJiLEdBQXpCLENBQWhCO0FBQ0EsUUFBTWMsZUFBZSxHQUFHekIsa0JBQWtCLFdBQUlLLGdCQUFKLGdCQUExQztBQUNBLFFBQU1xQixtQkFBbUIsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlILGVBQVosS0FBZ0MsRUFBNUQ7QUFFQWQsSUFBQUEsR0FBRyxDQUFDa0IsT0FBSixHQUNHcEIsSUFESCxDQUNRLFlBQU07QUFDVixVQUFNcUIsTUFBTSxHQUFHLHVCQUFmO0FBRUFKLE1BQUFBLG1CQUFtQixDQUFDSyxPQUFwQixDQUE0QixVQUFBQyxHQUFHLEVBQUk7QUFDakNGLFFBQUFBLE1BQU0sQ0FBQ0csR0FBUCwwQkFBNkJELEdBQTdCLEdBQW9DUCxlQUFlLENBQUNPLEdBQUQsQ0FBbkQ7QUFDRCxPQUZEO0FBSUFGLE1BQUFBLE1BQU0sQ0FBQ0ksR0FBUCxDQUFXLEdBQVgsRUFBZ0IsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQWM7QUFDNUIsZUFBT2IsT0FBTyxDQUFDWSxHQUFELEVBQU1DLEdBQU4sQ0FBZDtBQUNELE9BRkQ7QUFJQU4sTUFBQUEsTUFBTSxDQUFDTyxNQUFQLENBQWN2QixJQUFkLEVBQW9CLFVBQUN3QixHQUFELEVBQVM7QUFDM0IsWUFBSUEsR0FBSixFQUFTLE1BQU1BLEdBQU47QUFDVEMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLHVDQUEyQzFCLElBQTNDO0FBQ0QsT0FIRDtBQUlELEtBaEJILEVBaUJHMkIsS0FqQkgsQ0FpQlMsVUFBQ0MsS0FBRCxFQUFXO0FBQ2hCSCxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxPQUFaLEVBQXFCRSxLQUFyQjtBQUNELEtBbkJIO0FBb0JELEdBbENIO0FBbUNELENBdENEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBleHByZXNzIGZyb20gJ2V4cHJlc3MnXG5jb25zdCByZXF1aXJlRm9vbFdlYnBhY2sgPSByZXF1aXJlKCdyZXF1aXJlLWZvb2wtd2VicGFjaycpXG4vL1xuaW1wb3J0IGZpcmVzdHVkaW9BcHAgZnJvbSAnLi9hcHAnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4vYnVpbGQvY29uZmlnJ1xuaW1wb3J0IGJ1aWxkRnVuY3Rpb25zIGZyb20gJy4vYnVpbGQvZnVuY3Rpb25zJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IChjdXJyZW50UGF0aCkgPT4ge1xuICBjb25zdCBmdW5jdGlvbnNEaXN0RGlyID0gcGF0aC5qb2luKGN1cnJlbnRQYXRoLCAndG1wJylcbiAgXG4gIGJ1aWxkRnVuY3Rpb25zKGN1cnJlbnRQYXRoLCBjb25maWcsIHRydWUpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgbmV4dERpciA9IHBhdGguam9pbihjdXJyZW50UGF0aCwgY29uZmlnLmFwcC5kaXIpXG4gICAgICBjb25zdCByb3V0ZXIgPSByZXF1aXJlRm9vbFdlYnBhY2socGF0aC5qb2luKG5leHREaXIsICdyb3V0ZXInKSlcbiAgICAgIGNvbnN0IHBvcnQgPSBwYXJzZUludChwcm9jZXNzLmVudi5QT1JULCAxMCkgfHwgMzAwMFxuICAgICAgY29uc3QgYXBwID0gZmlyZXN0dWRpb0FwcCh7XG4gICAgICAgIGRldjogdHJ1ZSxcbiAgICAgICAgZGlyOiBuZXh0RGlyLFxuICAgICAgICBjb25mOiB7Li4uY29uZmlnLmFwcC5uZXh0LCBkaXN0RGlyOiBgLi8uLi8uLi90bXAvYXBwYH0sXG4gICAgICB9KVxuICAgICAgY29uc3QgaGFuZGxlciA9IHJvdXRlci5nZXRSZXF1ZXN0SGFuZGxlcihhcHApXG4gICAgICBjb25zdCBjdXN0b21GdW5jdGlvbnMgPSByZXF1aXJlRm9vbFdlYnBhY2soYCR7ZnVuY3Rpb25zRGlzdERpcn0vZnVuY3Rpb25zYClcbiAgICAgIGNvbnN0IGN1c3RvbUZ1bmN0aW9uc0tleXMgPSBPYmplY3Qua2V5cyhjdXN0b21GdW5jdGlvbnMpIHx8IFtdXG5cbiAgICAgIGFwcC5wcmVwYXJlKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlcnZlciA9IGV4cHJlc3MoKVxuXG4gICAgICAgICAgY3VzdG9tRnVuY3Rpb25zS2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBzZXJ2ZXIuYWxsKGAvYXBpL2Z1bmN0aW9ucy8ke2tleX1gLCBjdXN0b21GdW5jdGlvbnNba2V5XSlcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgc2VydmVyLmdldCgnKicsIChyZXEsIHJlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIocmVxLCByZXMpXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHNlcnZlci5saXN0ZW4ocG9ydCwgKGVycikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgdGhyb3cgZXJyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgPiBSZWFkeSBvbiBodHRwOi8vbG9jYWxob3N0OiR7cG9ydH1gKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLCBlcnJvcilcbiAgICAgICAgfSlcbiAgICB9KVxufVxuIl19