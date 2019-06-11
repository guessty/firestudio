import * as React from 'react'
//
import Loader from './../components/PageLoader'
const buildRoutes = require('./../build/routes')
//

export default (App) => class _App extends React.Component {
  static async getInitialProps(appContext) {
    const appProps = (typeof App.getInitialProps === 'function') ?
      await App.getInitialProps(appContext) : {}

    return {
      ...appProps,
    }
  }

  static Routes = buildRoutes(process.env.ROUTES || [])

  state = {
    ready: this.isReady(),
  }

  async componentDidMount() {
    await this.checkPath();
  }

  async checkPath() {
    const { router } = this.props
    if (this.isDynamicPath()) {
      await _App.Routes.Router.pushRoute(router.asPath)
      this.setState({
        isReady: true
      })
    }
  }

  isDynamicPath() {
    const { router } = this.props
    const staticRoutes = _App.Routes.routes.filter((route) => !route.pattern.includes('/:'))
    const potentialStaticMatches = staticRoutes.filter((route) => route.regex.test(router.asPath))
    if (potentialStaticMatches.length) {
      return false;
    }
    const dynamicRoutes = _App.Routes.routes.filter((route) => route.pattern.includes('/:'))
    const potentialDynamicMatches = dynamicRoutes.filter((route) => route.regex.test(router.asPath))
    return !!potentialDynamicMatches.length
  }

  isReady() {
    const { router } = this.props
    return !this.isDynamicPath() && router.pathname !== '/404'
  }
  
  render() {
    const { pageProps } = this.props
    const { isReady } = this.state
    const isPageLoading = this.isDynamicPath() && !isReady

    console.log(isPageLoading)

    const appProps = {
      ...this.props,
      pageProps: {
        PageLoader: Loader,
        isPageLoading,
        ...pageProps,
      }
    }

    return <App {...appProps} />
  }
}
