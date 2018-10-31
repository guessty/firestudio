const nextRoutes = require('next-routes')
//

const buildRoutes = (routes = []) => {
  const appRoutes = nextRoutes()
  
  routes.forEach((route) => {
    appRoutes.add({ pattern: route.pattern, page: route.page });
  })

  return appRoutes
}

module.exports = buildRoutes
