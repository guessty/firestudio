const nextRoutes = require('next-routes')

const initRouter = (routes) => {
  const router = nextRoutes()
  routes.forEach((route) => {
    router.add(route.name, route.pattern, route.page);
  })
  return router
}

module.exports = initRouter
