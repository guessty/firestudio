import * as React from 'react'
import * as Unstated from 'unstated'
import { detailedDiff } from 'deep-object-diff'
//

interface IFirestudioIndexProps {
  children: any
  debugStore?: boolean
}

class Provider extends React.PureComponent<IFirestudioIndexProps> {
  componentDidMount() {
    if (this.props.debugStore) {
      StoreDebugger.isEnabled = true
    }
  }
  render() {
    const { children } = this.props
    return (
      <Unstated.Provider>
        {children}
      </Unstated.Provider>
    )
  }
}

const FIRESTUDIO_STORE_DEBUGGER = {
  isEnabled: false,
}

if (typeof window !== 'undefined') {
	(window as any).FIRESTUDIO_STORE_DEBUGGER = FIRESTUDIO_STORE_DEBUGGER;
}

const StoreDebugger = FIRESTUDIO_STORE_DEBUGGER

class Container extends Unstated.Container<any> {
  state = {}
  setState = async (
    updater: object | ((prevState: object) => object),
    callback?: () => void
  ): Promise<void> => {
    const name = this.constructor.name
    const prevState = { ...this.state }
    await super.setState(updater, callback)
    const newState = { ...this.state }

    if (FIRESTUDIO_STORE_DEBUGGER.isEnabled) {
      const diff: {
        added?: string,
        updated?: string,
        deleted?: string,
      } = detailedDiff(prevState, newState)
  
      console.groupCollapsed(name)
      const hasChanges = (obj: any) => !!Object.keys(obj).length
  
      if (hasChanges(diff.added)) {
        console.log('Added\n', diff.added);
      }
  
      if (hasChanges(diff.updated)) {
        console.log('Updated\n', diff.updated);
      }
  
      if (hasChanges(diff.deleted)) {
        console.log('Deleted\n', diff.deleted);
      }
      
      console.log('New state\n', newState);
      console.log('Old state\n', prevState);
      console.groupEnd()
    }
  }
}

const subscribe = (to: any) => (Component: any) => (props: any) => {
  const containers = Object.keys(to).map(key => to[key])
  return (
    <Unstated.Subscribe to={[...containers]}>
      {(...values) => {
        const mappedContainers = Object.keys(to).reduce((acc:any, key, i) => {
          acc[key] = values[i];
          return acc;
        }, {});
        return <Component {...props} {...mappedContainers} />;
      }}
    </Unstated.Subscribe>
  )
}


export {
  Provider,
  Container,
  subscribe
}