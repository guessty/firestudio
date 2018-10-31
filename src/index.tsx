import * as React from 'react'
//
import { Store, StoreDebugger } from './lib/store'
import RouteRenderMethod from './lib/components/route-render-method'
//

const isDevelopment = process.env.NODE_ENV === 'development'

interface IFirestudioIndexProps {
  children: any
  debugStore?: boolean
}

class Firestudio extends React.Component<IFirestudioIndexProps> {
  componentDidMount() {
    if (isDevelopment) {
      StoreDebugger.isEnabled = true
    }
  }
  render() {
    const { children } = this.props
    return (
      <Store>
        {isDevelopment ? <RouteRenderMethod /> : null}
        {children}
      </Store>
    )
  }
}

export default Firestudio
