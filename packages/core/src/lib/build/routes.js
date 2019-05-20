const nextRoutes = require('next-routes')
//

const buildRoutes = (routes = []) => {
  const appRoutes = nextRoutes()

  routes.filter(route => !route.pattern.includes('/:'))
    .forEach((route) => {
      appRoutes.add({ pattern: route.pattern, page: route.page });
    })
  
  routes.filter(route => route.pattern.includes('/:'))
    .forEach((route) => {
      appRoutes.add({ pattern: route.pattern, page: route.page });
    })

  return appRoutes
}

module.exports = buildRoutes
export default buildRoutes
