import * as React from 'react'
import Routes, { Router } from './../routes'
//
import Loader from './client-loader'

interface IClientRerouterProps {
  loaderComponent?: React.PureComponent
}

export default class extends React.PureComponent<IClientRerouterProps> {
  componentDidMount() {
    const routes = Routes.routes
    const asPath = Router.asPath
    const potentialMatches = routes.filter((route: any) => route.regex.test(asPath))
    if (potentialMatches.length) {
      Router.pushRoute(asPath)
    } else {
      Router.pushRoute('/')
    }
  }

  render() {
    const { loaderComponent } = this.props
    return loaderComponent ? (loaderComponent) : (
      <Loader />
    )
  }
}
