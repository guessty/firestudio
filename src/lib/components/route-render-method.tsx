import * as React from 'react'
import getConfig from 'next/config'
//
import { Router } from './../routes'

interface IRouteRenderMethodState {
  domReady?: false
}

export default class RouteRenderMethod extends React.Component<{}> {
  state: IRouteRenderMethodState = {
    domReady: false,
  }

  componentDidMount() {
    this.setState({
      domReady: true,
    })
  }

  static getRouteText(pathname: string, routeMethodMap: {
    client: any
    cloud: any
    static: any
  }) {
    if (Object.prototype.hasOwnProperty.call(routeMethodMap.static, pathname)) {
      return 'Pre-rendered Page'
    } else if (Object.prototype.hasOwnProperty.call(routeMethodMap.cloud, pathname)) {
      return 'Cloud Rendered Page'
    } else {
      return 'Client Rendered Page'
    }
  }

  renderRenderMethod() {
    const { publicRuntimeConfig: { routeRenderMethods } } = getConfig()
    const { router: { pathname } } = Router

    const text = RouteRenderMethod.getRouteText(pathname, routeRenderMethods)

    return (
      <span
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 100,
          fontWeight: 'bold',
          fontSize: '16px',
          color: 'darkslategrey',
          border: '2px solid currentColor',
          borderRadius: '24px',
          background: 'white',
          padding: '8px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      >
        {text}
      </span>
    )
  }

  render() {
    const { domReady } = this.state
    return domReady ? this.renderRenderMethod() : null
  }
}
