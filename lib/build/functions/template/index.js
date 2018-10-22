"use strict";

require("core-js/modules/web.dom.iterable");

var functions = _interopRequireWildcard(require("firebase-functions"));

var appFunctions = _interopRequireWildcard(require("./functions"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//
var App = require('firestudio');

var router = require('./router'); //


var firestudioApp = function firestudioApp(request, response) {
  var app = App({
    dev: false,
    conf: {
      distDir: 'app'
    }
  });
  var handler = router.getRequestHandler(app);
  console.log('File: ' + request.originalUrl); // eslint-disable-line no-console

  return app.prepare().then(function () {
    return handler(request, response);
  });
};

if (Object.keys(router.cloudRoutes).length) {
  Object.defineProperty(exports, 'firestudioApp', {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(firestudioApp);
    }
  });
}

Object.keys(appFunctions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(appFunctions[key]);
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvYnVpbGQvZnVuY3Rpb25zL3RlbXBsYXRlL2luZGV4LmpzIl0sIm5hbWVzIjpbIkFwcCIsInJlcXVpcmUiLCJyb3V0ZXIiLCJmaXJlc3R1ZGlvQXBwIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXBwIiwiZGV2IiwiY29uZiIsImRpc3REaXIiLCJoYW5kbGVyIiwiZ2V0UmVxdWVzdEhhbmRsZXIiLCJjb25zb2xlIiwibG9nIiwib3JpZ2luYWxVcmwiLCJwcmVwYXJlIiwidGhlbiIsIk9iamVjdCIsImtleXMiLCJjbG91ZFJvdXRlcyIsImxlbmd0aCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsImVudW1lcmFibGUiLCJnZXQiLCJmdW5jdGlvbnMiLCJodHRwcyIsIm9uUmVxdWVzdCIsImFwcEZ1bmN0aW9ucyIsImZvckVhY2giLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7QUFFQTs7OztBQURBO0FBRUEsSUFBTUEsR0FBRyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFuQjs7QUFDQSxJQUFNQyxNQUFNLEdBQUdELE9BQU8sQ0FBQyxVQUFELENBQXRCLEMsQ0FDQTs7O0FBRUEsSUFBTUUsYUFBYSxHQUFHLFNBQWhCQSxhQUFnQixDQUFDQyxPQUFELEVBQVVDLFFBQVYsRUFBdUI7QUFDM0MsTUFBTUMsR0FBRyxHQUFHTixHQUFHLENBQUM7QUFBRU8sSUFBQUEsR0FBRyxFQUFFLEtBQVA7QUFBY0MsSUFBQUEsSUFBSSxFQUFFO0FBQUVDLE1BQUFBLE9BQU8sRUFBRTtBQUFYO0FBQXBCLEdBQUQsQ0FBZjtBQUNBLE1BQU1DLE9BQU8sR0FBR1IsTUFBTSxDQUFDUyxpQkFBUCxDQUF5QkwsR0FBekIsQ0FBaEI7QUFDQU0sRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBV1QsT0FBTyxDQUFDVSxXQUEvQixFQUgyQyxDQUdDOztBQUM1QyxTQUFPUixHQUFHLENBQUNTLE9BQUosR0FBY0MsSUFBZCxDQUFtQjtBQUFBLFdBQU1OLE9BQU8sQ0FBQ04sT0FBRCxFQUFVQyxRQUFWLENBQWI7QUFBQSxHQUFuQixDQUFQO0FBQ0QsQ0FMRDs7QUFPQSxJQUFJWSxNQUFNLENBQUNDLElBQVAsQ0FBWWhCLE1BQU0sQ0FBQ2lCLFdBQW5CLEVBQWdDQyxNQUFwQyxFQUE0QztBQUMxQ0gsRUFBQUEsTUFBTSxDQUFDSSxjQUFQLENBQXNCQyxPQUF0QixFQUErQixlQUEvQixFQUFnRDtBQUM5Q0MsSUFBQUEsVUFBVSxFQUFFLElBRGtDO0FBRTlDQyxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLGFBQU9DLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQkMsU0FBaEIsQ0FBMEJ4QixhQUExQixDQUFQO0FBQ0Q7QUFKNkMsR0FBaEQ7QUFNRDs7QUFFRGMsTUFBTSxDQUFDQyxJQUFQLENBQVlVLFlBQVosRUFBMEJDLE9BQTFCLENBQWtDLFVBQUNDLEdBQUQsRUFBUztBQUN6QyxNQUFJQSxHQUFHLEtBQUssU0FBUixJQUFxQkEsR0FBRyxLQUFLLFlBQWpDLEVBQStDO0FBQy9DYixFQUFBQSxNQUFNLENBQUNJLGNBQVAsQ0FBc0JDLE9BQXRCLEVBQStCUSxHQUEvQixFQUFvQztBQUNsQ1AsSUFBQUEsVUFBVSxFQUFFLElBRHNCO0FBRWxDQyxJQUFBQSxHQUFHLEVBQUUsU0FBU0EsR0FBVCxHQUFlO0FBQ2xCLGFBQU9DLFNBQVMsQ0FBQ0MsS0FBVixDQUFnQkMsU0FBaEIsQ0FBMEJDLFlBQVksQ0FBQ0UsR0FBRCxDQUF0QyxDQUFQO0FBQ0Q7QUFKaUMsR0FBcEM7QUFNRCxDQVJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnVuY3Rpb25zIGZyb20gJ2ZpcmViYXNlLWZ1bmN0aW9ucydcbi8vXG5pbXBvcnQgKiBhcyBhcHBGdW5jdGlvbnMgZnJvbSAnLi9mdW5jdGlvbnMnXG5jb25zdCBBcHAgPSByZXF1aXJlKCdmaXJlc3R1ZGlvJylcbmNvbnN0IHJvdXRlciA9IHJlcXVpcmUoJy4vcm91dGVyJylcbi8vXG5cbmNvbnN0IGZpcmVzdHVkaW9BcHAgPSAocmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgY29uc3QgYXBwID0gQXBwKHsgZGV2OiBmYWxzZSwgY29uZjogeyBkaXN0RGlyOiAnYXBwJyB9IH0pXG4gIGNvbnN0IGhhbmRsZXIgPSByb3V0ZXIuZ2V0UmVxdWVzdEhhbmRsZXIoYXBwKVxuICBjb25zb2xlLmxvZygnRmlsZTogJyArIHJlcXVlc3Qub3JpZ2luYWxVcmwpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICByZXR1cm4gYXBwLnByZXBhcmUoKS50aGVuKCgpID0+IGhhbmRsZXIocmVxdWVzdCwgcmVzcG9uc2UpKVxufVxuXG5pZiAoT2JqZWN0LmtleXMocm91dGVyLmNsb3VkUm91dGVzKS5sZW5ndGgpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdmaXJlc3R1ZGlvQXBwJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb25zLmh0dHBzLm9uUmVxdWVzdChmaXJlc3R1ZGlvQXBwKVxuICAgIH1cbiAgfSkgXG59XG5cbk9iamVjdC5rZXlzKGFwcEZ1bmN0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gIGlmIChrZXkgPT09IFwiZGVmYXVsdFwiIHx8IGtleSA9PT0gXCJfX2VzTW9kdWxlXCIpIHJldHVyblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbnMuaHR0cHMub25SZXF1ZXN0KGFwcEZ1bmN0aW9uc1trZXldKVxuICAgIH1cbiAgfSlcbn0pXG4iXX0=