const nextRoutes = require('next-routes')
//

interface IRouteProps {
  name: string
  pattern: string
  page: string
  renderMethod: string
}

const initRouter = (routes: any = []) => {
  const router = nextRoutes()
  routes.forEach((route: IRouteProps) => {
    router.add(route.name, route.pattern, route.page);
  })

  const withDefaults = (route: IRouteProps) => ({
    renderMethod: 'client',
    ...route
  })

  const exportRoutes = [
    ...routes,
    { name: '404', pattern: '/404.html', page: '/_404' },
    { name: 'router', pattern: '/router.html', page: '/_router'},
  ]

  const clientPathMap: any = {}
  const cloudPathMap: any = {}
  const staticPathMap: any = {}

  exportRoutes.forEach((route) => {
    const routeWithDefaults = withDefaults(route)
    if (routeWithDefaults.renderMethod === 'pre'
      || routeWithDefaults.page === '/_router'
      || routeWithDefaults.page === '/_404') {
      staticPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else if (routeWithDefaults.renderMethod === 'cloud') {
      cloudPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else {
      clientPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    }
  })

  router['staticRoutes'] = staticPathMap
  router['clientRoutes'] = clientPathMap
  router['cloudRoutes'] = cloudPathMap

  return router
}

export default initRouter
