const nextRoutes = require('next-routes')
//

const buildRoutes = (routes = []) => {
  const appRoutes = nextRoutes()

  routes.filter(route => !(route.pattern.includes('/:') || route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => {
      appRoutes.add({ pattern: route.pattern, page: route.page });
    })
  
  routes.filter(route => (route.pattern.includes('/:') && !route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => {
      appRoutes.add({ pattern: route.pattern, page: route.page });
    })

  routes.filter(route => (route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => {
      const pattern = route.pattern.replace(/\:\*/g, ':_params*')
      appRoutes.add({ pattern, page: route.page });
    })

  return appRoutes
}

module.exports = buildRoutes
export default buildRoutes
