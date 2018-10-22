"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildDeploymentConfig;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/web.dom.iterable");

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var requireFoolWebpack = require('require-fool-webpack'); //


var generateFirebasrc = function generateFirebasrc(config) {
  var firebaserc = JSON.stringify({
    projects: {
      default: config.firebase.projectId
    }
  });
  return firebaserc;
};

var generateJSON = function generateJSON(config, functionsDistDir, routerSource) {
  var appRouter = requireFoolWebpack("".concat(routerSource));
  var configRewrites = config.rewrites || [];
  var clientRewrites = Object.keys(appRouter.clientRoutes).map(function (route) {
    var source = route.split(':slug').join('**');
    return {
      source: source,
      destination: '/router.html'
    };
  });
  var cloudRewrites = Object.keys(appRouter.cloudRoutes).map(function (route) {
    var source = route.split(':slug').join('**');
    return {
      source: source,
      function: 'firestudioApp'
    };
  }); // added specific rewrite for static routes in order to support serve.js

  var staticRewrites = Object.keys(appRouter.staticRoutes).map(function (route) {
    var expression = /(.html|.json)/;
    var destination = expression.test(route) ? route : _path.default.join(route, 'index.html');
    return {
      source: route,
      destination: destination
    };
  });
  var customFunctions = {};

  try {
    customFunctions = requireFoolWebpack("".concat(functionsDistDir, "/functions"));
  } catch (_unused) {
    console.log('> no custom functions to rewrite');
  }

  var functionRewrites = Object.keys(customFunctions).map(function (key) {
    return {
      source: "/api/functions/".concat(key),
      function: key
    };
  });

  var firebaseRewrites = _toConsumableArray(configRewrites).concat(_toConsumableArray(clientRewrites), _toConsumableArray(cloudRewrites), _toConsumableArray(functionRewrites));

  var serveRewrites = _toConsumableArray(staticRewrites).concat(_toConsumableArray(configRewrites), _toConsumableArray(clientRewrites), _toConsumableArray(cloudRewrites), _toConsumableArray(functionRewrites));

  var firebaseHostingConfig = {
    hosting: {
      public: 'public',
      ignore: ['firebase.json', '**/.*', '**/node_nodules/**'],
      rewrites: firebaseRewrites
    }
  };
  var firebaseFunctionsConfig = config.functions.enabled ? {
    functions: {
      source: 'functions'
    }
  } : {};
  var firebaseJSONConfig = JSON.stringify(_objectSpread({}, firebaseHostingConfig, firebaseFunctionsConfig));
  var serveJSONConfig = JSON.stringify({
    rewrites: serveRewrites
  });
  return {
    firebase: firebaseJSONConfig,
    serve: serveJSONConfig
  };
};

function buildDeploymentConfig(_x, _x2) {
  return _buildDeploymentConfig.apply(this, arguments);
}

function _buildDeploymentConfig() {
  _buildDeploymentConfig = _asyncToGenerator(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(currentPath, config) {
    var distDir, functionsDistDir, routerSource, JSONConfig;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            distDir = _path.default.join(currentPath, config.dist.dir);
            functionsDistDir = _path.default.join(currentPath, config.dist.functions.dir);
            routerSource = _path.default.join(currentPath, config.app.dir, 'router.js');
            console.log('Building Deployment Config...');
            _context.next = 6;
            return (0, _fs.writeFileSync)(_path.default.join(distDir, '.firebaserc'), generateFirebasrc(config), 'utf8', function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log(".firebaserc was saved!");
              }
            });

          case 6:
            _context.next = 8;
            return generateJSON(config, functionsDistDir, routerSource);

          case 8:
            JSONConfig = _context.sent;
            _context.next = 11;
            return (0, _fs.writeFileSync)(_path.default.join(distDir, 'firebase.json'), JSONConfig.firebase, 'utf8', function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("firebase.json was saved!");
              }
            });

          case 11:
            _context.next = 13;
            return (0, _fs.writeFileSync)(_path.default.join(distDir, '/public/serve.json'), JSONConfig.serve, 'utf8', function (err) {
              if (err) {
                console.log(err);
              } else {
                console.log("serve.json was saved!");
              }
            });

          case 13:
            console.log('Deployment Config Built');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _buildDeploymentConfig.apply(this, arguments);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvYnVpbGQvZGVwbG95bWVudC1jb25maWcuanMiXSwibmFtZXMiOlsicmVxdWlyZUZvb2xXZWJwYWNrIiwicmVxdWlyZSIsImdlbmVyYXRlRmlyZWJhc3JjIiwiY29uZmlnIiwiZmlyZWJhc2VyYyIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9qZWN0cyIsImRlZmF1bHQiLCJmaXJlYmFzZSIsInByb2plY3RJZCIsImdlbmVyYXRlSlNPTiIsImZ1bmN0aW9uc0Rpc3REaXIiLCJyb3V0ZXJTb3VyY2UiLCJhcHBSb3V0ZXIiLCJjb25maWdSZXdyaXRlcyIsInJld3JpdGVzIiwiY2xpZW50UmV3cml0ZXMiLCJPYmplY3QiLCJrZXlzIiwiY2xpZW50Um91dGVzIiwibWFwIiwicm91dGUiLCJzb3VyY2UiLCJzcGxpdCIsImpvaW4iLCJkZXN0aW5hdGlvbiIsImNsb3VkUmV3cml0ZXMiLCJjbG91ZFJvdXRlcyIsImZ1bmN0aW9uIiwic3RhdGljUmV3cml0ZXMiLCJzdGF0aWNSb3V0ZXMiLCJleHByZXNzaW9uIiwidGVzdCIsInBhdGgiLCJjdXN0b21GdW5jdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiZnVuY3Rpb25SZXdyaXRlcyIsImtleSIsImZpcmViYXNlUmV3cml0ZXMiLCJzZXJ2ZVJld3JpdGVzIiwiZmlyZWJhc2VIb3N0aW5nQ29uZmlnIiwiaG9zdGluZyIsInB1YmxpYyIsImlnbm9yZSIsImZpcmViYXNlRnVuY3Rpb25zQ29uZmlnIiwiZnVuY3Rpb25zIiwiZW5hYmxlZCIsImZpcmViYXNlSlNPTkNvbmZpZyIsInNlcnZlSlNPTkNvbmZpZyIsInNlcnZlIiwiYnVpbGREZXBsb3ltZW50Q29uZmlnIiwiY3VycmVudFBhdGgiLCJkaXN0RGlyIiwiZGlzdCIsImRpciIsImFwcCIsImVyciIsIkpTT05Db25maWciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFN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O0FBQ0gsZUFGRCxNQUVPO0FBQ0h0QixnQkFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksdUJBQVo7QUFDSDtBQUNGLGFBTkssQ0F4Qk87O0FBQUE7QUFnQ2JELFlBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHlCQUFaOztBQWhDYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd3JpdGVGaWxlU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmNvbnN0IHJlcXVpcmVGb29sV2VicGFjayA9IHJlcXVpcmUoJ3JlcXVpcmUtZm9vbC13ZWJwYWNrJylcbi8vXG5cbmNvbnN0IGdlbmVyYXRlRmlyZWJhc3JjID0gKGNvbmZpZykgPT4ge1xuICBjb25zdCBmaXJlYmFzZXJjID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHByb2plY3RzOiB7XG4gICAgICBkZWZhdWx0OiBjb25maWcuZmlyZWJhc2UucHJvamVjdElkXG4gICAgfVxuICB9KVxuICBcbiAgcmV0dXJuIGZpcmViYXNlcmNcbn1cblxuY29uc3QgZ2VuZXJhdGVKU09OID0gKGNvbmZpZywgZnVuY3Rpb25zRGlzdERpciwgcm91dGVyU291cmNlKSA9PiB7XG4gIGNvbnN0IGFwcFJvdXRlciA9IHJlcXVpcmVGb29sV2VicGFjayhgJHtyb3V0ZXJTb3VyY2V9YClcblxuICBjb25zdCBjb25maWdSZXdyaXRlcyA9IGNvbmZpZy5yZXdyaXRlcyB8fCBbXVxuXG4gIGNvbnN0IGNsaWVudFJld3JpdGVzID0gT2JqZWN0LmtleXMoYXBwUm91dGVyLmNsaWVudFJvdXRlcykubWFwKChyb3V0ZSkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IHJvdXRlLnNwbGl0KCc6c2x1ZycpLmpvaW4oJyoqJylcbiAgICByZXR1cm4ge1xuICAgICAgc291cmNlLFxuICAgICAgZGVzdGluYXRpb246ICcvcm91dGVyLmh0bWwnXG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IGNsb3VkUmV3cml0ZXMgPSBPYmplY3Qua2V5cyhhcHBSb3V0ZXIuY2xvdWRSb3V0ZXMpLm1hcCgocm91dGUpID0+IHtcbiAgICBjb25zdCBzb3VyY2UgPSByb3V0ZS5zcGxpdCgnOnNsdWcnKS5qb2luKCcqKicpXG4gICAgcmV0dXJuIHtcbiAgICAgIHNvdXJjZSxcbiAgICAgIGZ1bmN0aW9uOiAnZmlyZXN0dWRpb0FwcCdcbiAgICB9XG4gIH0pXG5cbiAgLy8gYWRkZWQgc3BlY2lmaWMgcmV3cml0ZSBmb3Igc3RhdGljIHJvdXRlcyBpbiBvcmRlciB0byBzdXBwb3J0IHNlcnZlLmpzXG4gIGNvbnN0IHN0YXRpY1Jld3JpdGVzID0gT2JqZWN0LmtleXMoYXBwUm91dGVyLnN0YXRpY1JvdXRlcykubWFwKChyb3V0ZSkgPT4ge1xuICAgIGNvbnN0IGV4cHJlc3Npb24gPSAvKC5odG1sfC5qc29uKS9cbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGV4cHJlc3Npb24udGVzdChyb3V0ZSkgPyByb3V0ZSA6IHBhdGguam9pbihyb3V0ZSwgJ2luZGV4Lmh0bWwnKVxuICAgIHJldHVybiB7XG4gICAgICBzb3VyY2U6IHJvdXRlLFxuICAgICAgZGVzdGluYXRpb25cbiAgICB9XG4gIH0pXG5cbiAgbGV0IGN1c3RvbUZ1bmN0aW9ucyA9IHt9XG4gIHRyeSB7XG4gICAgY3VzdG9tRnVuY3Rpb25zID0gcmVxdWlyZUZvb2xXZWJwYWNrKGAke2Z1bmN0aW9uc0Rpc3REaXJ9L2Z1bmN0aW9uc2ApXG4gIH0gY2F0Y2gge1xuICAgIGNvbnNvbGUubG9nKCc+IG5vIGN1c3RvbSBmdW5jdGlvbnMgdG8gcmV3cml0ZScpXG4gIH1cbiAgY29uc3QgZnVuY3Rpb25SZXdyaXRlcyA9IE9iamVjdC5rZXlzKGN1c3RvbUZ1bmN0aW9ucykubWFwKChrZXkpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc291cmNlOiBgL2FwaS9mdW5jdGlvbnMvJHtrZXl9YCxcbiAgICAgIGZ1bmN0aW9uOiBrZXksXG4gICAgfVxuICB9KVxuICBcbiAgY29uc3QgZmlyZWJhc2VSZXdyaXRlcyA9IFtcbiAgICAuLi5jb25maWdSZXdyaXRlcyxcbiAgICAuLi5jbGllbnRSZXdyaXRlcyxcbiAgICAuLi5jbG91ZFJld3JpdGVzLFxuICAgIC4uLmZ1bmN0aW9uUmV3cml0ZXMsXG4gIF1cblxuICBjb25zdCBzZXJ2ZVJld3JpdGVzID1bXG4gICAgLi4uc3RhdGljUmV3cml0ZXMsXG4gICAgLi4uY29uZmlnUmV3cml0ZXMsXG4gICAgLi4uY2xpZW50UmV3cml0ZXMsXG4gICAgLi4uY2xvdWRSZXdyaXRlcyxcbiAgICAuLi5mdW5jdGlvblJld3JpdGVzLFxuICBdXG5cbiAgY29uc3QgZmlyZWJhc2VIb3N0aW5nQ29uZmlnID0ge1xuICAgIGhvc3Rpbmc6IHtcbiAgICAgIHB1YmxpYzogJ3B1YmxpYycsXG4gICAgICBpZ25vcmU6IFtcbiAgICAgICAgJ2ZpcmViYXNlLmpzb24nLFxuICAgICAgICAnKiovLionLFxuICAgICAgICAnKiovbm9kZV9ub2R1bGVzLyoqJ1xuICAgICAgXSxcbiAgICAgIHJld3JpdGVzOiBmaXJlYmFzZVJld3JpdGVzXG4gICAgfVxuICB9XG4gIGNvbnN0IGZpcmViYXNlRnVuY3Rpb25zQ29uZmlnID0gY29uZmlnLmZ1bmN0aW9ucy5lbmFibGVkID8geyBmdW5jdGlvbnM6IHsgc291cmNlOiAnZnVuY3Rpb25zJyB9IH0gOiB7fVxuXG4gIGNvbnN0IGZpcmViYXNlSlNPTkNvbmZpZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAuLi5maXJlYmFzZUhvc3RpbmdDb25maWcsXG4gICAgLi4uZmlyZWJhc2VGdW5jdGlvbnNDb25maWcsXG4gIH0pXG5cbiAgY29uc3Qgc2VydmVKU09OQ29uZmlnID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIHJld3JpdGVzOiBzZXJ2ZVJld3JpdGVzXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBmaXJlYmFzZTogZmlyZWJhc2VKU09OQ29uZmlnLFxuICAgIHNlcnZlOiBzZXJ2ZUpTT05Db25maWdcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBidWlsZERlcGxveW1lbnRDb25maWcgKGN1cnJlbnRQYXRoLCBjb25maWcpIHtcbiAgY29uc3QgZGlzdERpciA9IHBhdGguam9pbihjdXJyZW50UGF0aCwgY29uZmlnLmRpc3QuZGlyKVxuICBjb25zdCBmdW5jdGlvbnNEaXN0RGlyID0gcGF0aC5qb2luKGN1cnJlbnRQYXRoLCBjb25maWcuZGlzdC5mdW5jdGlvbnMuZGlyKVxuICBjb25zdCByb3V0ZXJTb3VyY2UgPSBwYXRoLmpvaW4oY3VycmVudFBhdGgsIGNvbmZpZy5hcHAuZGlyLCAncm91dGVyLmpzJylcblxuICBjb25zb2xlLmxvZygnQnVpbGRpbmcgRGVwbG95bWVudCBDb25maWcuLi4nKVxuICBhd2FpdCB3cml0ZUZpbGVTeW5jKHBhdGguam9pbihkaXN0RGlyLCAnLmZpcmViYXNlcmMnKSwgZ2VuZXJhdGVGaXJlYmFzcmMoY29uZmlnKSwgJ3V0ZjgnLCBmdW5jdGlvbihlcnIpIHtcbiAgICBpZihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIi5maXJlYmFzZXJjIHdhcyBzYXZlZCFcIik7XG4gICAgfVxuICB9KVxuXG4gIGNvbnN0IEpTT05Db25maWcgPSBhd2FpdCBnZW5lcmF0ZUpTT04oY29uZmlnLCBmdW5jdGlvbnNEaXN0RGlyLCByb3V0ZXJTb3VyY2UpXG5cbiAgYXdhaXQgd3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oZGlzdERpciwgJ2ZpcmViYXNlLmpzb24nKSwgSlNPTkNvbmZpZy5maXJlYmFzZSwgJ3V0ZjgnLCBmdW5jdGlvbihlcnIpIHtcbiAgICBpZihlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmpzb24gd2FzIHNhdmVkIVwiKTtcbiAgICB9XG4gIH0pXG5cbiAgYXdhaXQgd3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oZGlzdERpciwgJy9wdWJsaWMvc2VydmUuanNvbicpLCBKU09OQ29uZmlnLnNlcnZlLCAndXRmOCcsIGZ1bmN0aW9uKGVycikge1xuICAgIGlmKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VydmUuanNvbiB3YXMgc2F2ZWQhXCIpO1xuICAgIH1cbiAgfSlcblxuICBjb25zb2xlLmxvZygnRGVwbG95bWVudCBDb25maWcgQnVpbHQnKVxufSJdfQ==