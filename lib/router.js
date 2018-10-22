"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var nextRoutes = require('next-routes'); //


var initRouter = function initRouter() {
  var routes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var router = nextRoutes();
  routes.forEach(function (route) {
    router.add(route.name, route.pattern, route.page);
  });

  var withDefaults = function withDefaults(route) {
    return _objectSpread({
      renderMethod: 'client'
    }, route);
  };

  var exportRoutes = _toConsumableArray(routes).concat([{
    name: '404',
    pattern: '/404.html',
    page: '/_404'
  }, {
    name: 'router',
    pattern: '/router.html',
    page: '/_router'
  }]);

  var clientPathMap = {};
  var cloudPathMap = {};
  var staticPathMap = {};
  exportRoutes.forEach(function (route) {
    var routeWithDefaults = withDefaults(route);

    if (routeWithDefaults.renderMethod === 'pre' || routeWithDefaults.page === '/_router' || routeWithDefaults.page === '/_404') {
      staticPathMap[routeWithDefaults.pattern] = {
        page: routeWithDefaults.page
      };
    } else if (routeWithDefaults.renderMethod === 'cloud') {
      cloudPathMap[routeWithDefaults.pattern] = {
        page: routeWithDefaults.page
      };
    } else {
      clientPathMap[routeWithDefaults.pattern] = {
        page: routeWithDefaults.page
      };
    }
  });
  router['staticRoutes'] = staticPathMap;
  router['clientRoutes'] = clientPathMap;
  router['cloudRoutes'] = cloudPathMap;
  return router;
};

var _default = initRouter;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9saWIvcm91dGVyLnRzIl0sIm5hbWVzIjpbIm5leHRSb3V0ZXMiLCJyZXF1aXJlIiwiaW5pdFJvdXRlciIsInJvdXRlcyIsInJvdXRlciIsImZvckVhY2giLCJyb3V0ZSIsImFkZCIsIm5hbWUiLCJwYXR0ZXJuIiwicGFnZSIsIndpdGhEZWZhdWx0cyIsInJlbmRlck1ldGhvZCIsImV4cG9ydFJvdXRlcyIsImNsaWVudFBhdGhNYXAiLCJjbG91ZFBhdGhNYXAiLCJzdGF0aWNQYXRoTWFwIiwicm91dGVXaXRoRGVmYXVsdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFVBQVUsR0FBR0MsT0FBTyxDQUFDLGFBQUQsQ0FBMUIsQyxDQUNBOzs7QUFTQSxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBYSxHQUFzQjtBQUFBLE1BQXJCQyxNQUFxQix1RUFBUCxFQUFPO0FBQ3ZDLE1BQU1DLE1BQU0sR0FBR0osVUFBVSxFQUF6QjtBQUNBRyxFQUFBQSxNQUFNLENBQUNFLE9BQVAsQ0FBZSxVQUFDQyxLQUFELEVBQXdCO0FBQ3JDRixJQUFBQSxNQUFNLENBQUNHLEdBQVAsQ0FBV0QsS0FBSyxDQUFDRSxJQUFqQixFQUF1QkYsS0FBSyxDQUFDRyxPQUE3QixFQUFzQ0gsS0FBSyxDQUFDSSxJQUE1QztBQUNELEdBRkQ7O0FBSUEsTUFBTUMsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBQ0wsS0FBRDtBQUFBO0FBQ25CTSxNQUFBQSxZQUFZLEVBQUU7QUFESyxPQUVoQk4sS0FGZ0I7QUFBQSxHQUFyQjs7QUFLQSxNQUFNTyxZQUFZLHNCQUNiVixNQURhLFVBRWhCO0FBQUVLLElBQUFBLElBQUksRUFBRSxLQUFSO0FBQWVDLElBQUFBLE9BQU8sRUFBRSxXQUF4QjtBQUFxQ0MsSUFBQUEsSUFBSSxFQUFFO0FBQTNDLEdBRmdCLEVBR2hCO0FBQUVGLElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxPQUFPLEVBQUUsY0FBM0I7QUFBMkNDLElBQUFBLElBQUksRUFBRTtBQUFqRCxHQUhnQixFQUFsQjs7QUFNQSxNQUFNSSxhQUFrQixHQUFHLEVBQTNCO0FBQ0EsTUFBTUMsWUFBaUIsR0FBRyxFQUExQjtBQUNBLE1BQU1DLGFBQWtCLEdBQUcsRUFBM0I7QUFFQUgsRUFBQUEsWUFBWSxDQUFDUixPQUFiLENBQXFCLFVBQUNDLEtBQUQsRUFBVztBQUM5QixRQUFNVyxpQkFBaUIsR0FBR04sWUFBWSxDQUFDTCxLQUFELENBQXRDOztBQUNBLFFBQUlXLGlCQUFpQixDQUFDTCxZQUFsQixLQUFtQyxLQUFuQyxJQUNDSyxpQkFBaUIsQ0FBQ1AsSUFBbEIsS0FBMkIsVUFENUIsSUFFQ08saUJBQWlCLENBQUNQLElBQWxCLEtBQTJCLE9BRmhDLEVBRXlDO0FBQ3ZDTSxNQUFBQSxhQUFhLENBQUNDLGlCQUFpQixDQUFDUixPQUFuQixDQUFiLEdBQTJDO0FBQUVDLFFBQUFBLElBQUksRUFBRU8saUJBQWlCLENBQUNQO0FBQTFCLE9BQTNDO0FBQ0QsS0FKRCxNQUlPLElBQUlPLGlCQUFpQixDQUFDTCxZQUFsQixLQUFtQyxPQUF2QyxFQUFnRDtBQUNyREcsTUFBQUEsWUFBWSxDQUFDRSxpQkFBaUIsQ0FBQ1IsT0FBbkIsQ0FBWixHQUEwQztBQUFFQyxRQUFBQSxJQUFJLEVBQUVPLGlCQUFpQixDQUFDUDtBQUExQixPQUExQztBQUNELEtBRk0sTUFFQTtBQUNMSSxNQUFBQSxhQUFhLENBQUNHLGlCQUFpQixDQUFDUixPQUFuQixDQUFiLEdBQTJDO0FBQUVDLFFBQUFBLElBQUksRUFBRU8saUJBQWlCLENBQUNQO0FBQTFCLE9BQTNDO0FBQ0Q7QUFDRixHQVhEO0FBYUFOLEVBQUFBLE1BQU0sQ0FBQyxjQUFELENBQU4sR0FBeUJZLGFBQXpCO0FBQ0FaLEVBQUFBLE1BQU0sQ0FBQyxjQUFELENBQU4sR0FBeUJVLGFBQXpCO0FBQ0FWLEVBQUFBLE1BQU0sQ0FBQyxhQUFELENBQU4sR0FBd0JXLFlBQXhCO0FBRUEsU0FBT1gsTUFBUDtBQUNELENBdkNEOztlQXlDZUYsVSIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG5leHRSb3V0ZXMgPSByZXF1aXJlKCduZXh0LXJvdXRlcycpXG4vL1xuXG5pbnRlcmZhY2UgSVJvdXRlUHJvcHMge1xuICBuYW1lOiBzdHJpbmdcbiAgcGF0dGVybjogc3RyaW5nXG4gIHBhZ2U6IHN0cmluZ1xuICByZW5kZXJNZXRob2Q6IHN0cmluZ1xufVxuXG5jb25zdCBpbml0Um91dGVyID0gKHJvdXRlczogYW55ID0gW10pID0+IHtcbiAgY29uc3Qgcm91dGVyID0gbmV4dFJvdXRlcygpXG4gIHJvdXRlcy5mb3JFYWNoKChyb3V0ZTogSVJvdXRlUHJvcHMpID0+IHtcbiAgICByb3V0ZXIuYWRkKHJvdXRlLm5hbWUsIHJvdXRlLnBhdHRlcm4sIHJvdXRlLnBhZ2UpO1xuICB9KVxuXG4gIGNvbnN0IHdpdGhEZWZhdWx0cyA9IChyb3V0ZTogSVJvdXRlUHJvcHMpID0+ICh7XG4gICAgcmVuZGVyTWV0aG9kOiAnY2xpZW50JyxcbiAgICAuLi5yb3V0ZVxuICB9KVxuXG4gIGNvbnN0IGV4cG9ydFJvdXRlcyA9IFtcbiAgICAuLi5yb3V0ZXMsXG4gICAgeyBuYW1lOiAnNDA0JywgcGF0dGVybjogJy80MDQuaHRtbCcsIHBhZ2U6ICcvXzQwNCcgfSxcbiAgICB7IG5hbWU6ICdyb3V0ZXInLCBwYXR0ZXJuOiAnL3JvdXRlci5odG1sJywgcGFnZTogJy9fcm91dGVyJ30sXG4gIF1cblxuICBjb25zdCBjbGllbnRQYXRoTWFwOiBhbnkgPSB7fVxuICBjb25zdCBjbG91ZFBhdGhNYXA6IGFueSA9IHt9XG4gIGNvbnN0IHN0YXRpY1BhdGhNYXA6IGFueSA9IHt9XG5cbiAgZXhwb3J0Um91dGVzLmZvckVhY2goKHJvdXRlKSA9PiB7XG4gICAgY29uc3Qgcm91dGVXaXRoRGVmYXVsdHMgPSB3aXRoRGVmYXVsdHMocm91dGUpXG4gICAgaWYgKHJvdXRlV2l0aERlZmF1bHRzLnJlbmRlck1ldGhvZCA9PT0gJ3ByZSdcbiAgICAgIHx8IHJvdXRlV2l0aERlZmF1bHRzLnBhZ2UgPT09ICcvX3JvdXRlcidcbiAgICAgIHx8IHJvdXRlV2l0aERlZmF1bHRzLnBhZ2UgPT09ICcvXzQwNCcpIHtcbiAgICAgIHN0YXRpY1BhdGhNYXBbcm91dGVXaXRoRGVmYXVsdHMucGF0dGVybl0gPSB7IHBhZ2U6IHJvdXRlV2l0aERlZmF1bHRzLnBhZ2UgfVxuICAgIH0gZWxzZSBpZiAocm91dGVXaXRoRGVmYXVsdHMucmVuZGVyTWV0aG9kID09PSAnY2xvdWQnKSB7XG4gICAgICBjbG91ZFBhdGhNYXBbcm91dGVXaXRoRGVmYXVsdHMucGF0dGVybl0gPSB7IHBhZ2U6IHJvdXRlV2l0aERlZmF1bHRzLnBhZ2UgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGllbnRQYXRoTWFwW3JvdXRlV2l0aERlZmF1bHRzLnBhdHRlcm5dID0geyBwYWdlOiByb3V0ZVdpdGhEZWZhdWx0cy5wYWdlIH1cbiAgICB9XG4gIH0pXG5cbiAgcm91dGVyWydzdGF0aWNSb3V0ZXMnXSA9IHN0YXRpY1BhdGhNYXBcbiAgcm91dGVyWydjbGllbnRSb3V0ZXMnXSA9IGNsaWVudFBhdGhNYXBcbiAgcm91dGVyWydjbG91ZFJvdXRlcyddID0gY2xvdWRQYXRoTWFwXG5cbiAgcmV0dXJuIHJvdXRlclxufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0Um91dGVyXG4iXX0=