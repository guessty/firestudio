const buildRoutes = require('./build/routes')
//

const routes = process.env.ROUTES || [];
const Routes = buildRoutes(routes)
const Link = Routes.Link
const Router = Routes.Router

export { Link, Router }

export default Routes
