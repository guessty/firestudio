import path from 'path'
//
import config from './config'

const nextRoutes = require('next-routes')
const router = nextRoutes()
const appDir = path.join(path.resolve('.'), config.appDir)

// const routes = require(`${path.join(appDir, 'config/routes')}`)
const routes = require(path.join(appDir, 'config/routes'))

routes.forEach((route) => {
  router.add(route.name, route.pattern, route.page);
})

module.exports = router
