import * as React from 'react'
import getConfig from 'next/config'
//
import Loader from './pages/page-loader'
const buildRoutes = require('./build/routes')
//

const { publicRuntimeConfig = { routesConfig: [] } } = getConfig() || {};
const { routes } = publicRuntimeConfig
const Routes = buildRoutes(routes)
const Link = Routes.Link
const Router = Routes.Router

const withSPAHandler = (App: any) => class extends React.Component {
  static async getInitialProps(appContext: any) {
    appContext.ctx.pageLoader = <Loader />
    const appProps = (typeof App.getInitialProps === 'function') ?
      await App.getInitialProps(appContext) : {}

    return { ...appProps }
  }
  componentDidMount() {
    const routes = Routes.routes.filter((route: any) => route.pattern.includes('/:'))
    const asPath = Router.asPath
    const potentialMatches = routes.filter((route: any) => route.regex.test(asPath))
    if (potentialMatches.length) {
      Router.pushRoute(asPath)
    }
  }
  render() {
    return (
      <App {...this.props} />
    )
  }
}

export { Link, Router, withSPAHandler }

export default Routes
