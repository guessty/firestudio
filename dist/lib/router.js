"use strict";

require("core-js/modules/web.dom.iterable");

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
var nextRoutes = require('next-routes');

var router = nextRoutes();

var appDir = _path.default.join(_path.default.resolve('.'), _config.default.appDir); // const routes = require(`${path.join(appDir, 'config/routes')}`)


var routes = require(_path.default.join(appDir, 'config/routes'));

routes.forEach(function (route) {
  router.add(route.name, route.pattern, route.page);
});
module.exports = router;