import getConfig from 'next/config'
//
import withRouter from './components/withRouter'
const buildRoutes = require('./build/routes')
//

const { publicRuntimeConfig = { routes: [] } } = getConfig() || {};
const { routes } = publicRuntimeConfig
const Routes = buildRoutes(routes)
const Link = Routes.Link
const Router = Routes.Router

export { Link, Router, withRouter }

export default Routes
