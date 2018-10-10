const nextRoutes = require('next-routes')

const initRouter = (routes = []) => {
  const router = nextRoutes()
  routes.forEach((route) => {
    router.add(route.name, route.pattern, route.page);
  })

  const withDefaults = (route) => ({
    prerender: true,
    ...route
  })

  const dynamicPathMap = {}
  
  const staticPathMap = routes.reduce((pathMap, route) => {
    const routeWithDefaults = withDefaults(route)
    if (routeWithDefaults.prerender) {
      pathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else {
      dynamicPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    }
    return pathMap
  }, {})

  router['staticRoutes'] = staticPathMap
  router['dynamicRoutes'] = dynamicPathMap

  return router
}

module.exports = initRouter
