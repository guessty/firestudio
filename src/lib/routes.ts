const nextRoutes = require('next-routes')
//

interface IRouteProps {
  pattern: string
  page: string
  renderMethod: string
}

const initRoutes = (routes: any = []) => {
  const appRoutes = nextRoutes()
  routes.forEach((route: IRouteProps) => {
    appRoutes.add({ pattern: route.pattern, page: route.page });
  })

  const withDefaults = (route: IRouteProps) => ({
    renderMethod: 'client',
    ...route
  })

  const exportRoutes = [
    ...routes,
    { pattern: '/404.html', page: '/_404' },
    { pattern: '/router.html', page: '/_router'},
  ]

  const clientPathMap: any = {}
  const cloudPathMap: any = {}
  const staticPathMap: any = {}

  exportRoutes.forEach((route) => {
    const routeWithDefaults = withDefaults(route)
    if (routeWithDefaults.renderMethod === 'static'
      || routeWithDefaults.page === '/_router'
      || routeWithDefaults.page === '/_404') {
      staticPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else if (routeWithDefaults.renderMethod === 'cloud') {
      cloudPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    } else {
      clientPathMap[routeWithDefaults.pattern] = { page: routeWithDefaults.page }
    }
  })

  appRoutes['staticRoutes'] = staticPathMap
  appRoutes['clientRoutes'] = clientPathMap
  appRoutes['cloudRoutes'] = cloudPathMap

  return appRoutes
}

export default initRoutes
