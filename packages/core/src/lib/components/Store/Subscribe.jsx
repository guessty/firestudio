import React, { Component } from 'react';
import * as Unstated from 'unstated';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Container from './Container';
//

class Subscribe extends Unstated.Subscribe {
  _createInstances(map, containers) {
    this._unsubscribe();

    if (map === null) {
      throw new Error(
        'You must wrap your <Subscribe> components with a <Provider>'
      );
    }

    let safeMap = map;
    let instances = containers.reduce((final, ContainerItem) => {
      let instance;

      if (
        typeof ContainerItem === 'object' &&
        ContainerItem instanceof Container
      ) {
        instance = ContainerItem;
      } else {
        instance = safeMap.get(ContainerItem);

        if (!instance) {
          // instance = new ContainerItem();
          safeMap.set(ContainerItem, undefined);
          return final;
        }
      }

      instance.unsubscribe(this.onUpdate);
      instance.subscribe(this.onUpdate);

      return [...final, instance];
    }, []);

    this.instances = instances;
    return instances;
  }
}

export default to => SubscribedComponent => {
  const containers = Object.keys(to).map(key => to[key]);

  class Subscriber extends Component {
    render() {
      return (
        <Subscribe to={[...containers]}>
          {(...values) => {
            const mappedContainers = Object.keys(to).reduce((acc, key, i) => {
              acc[key] = values[i];
    
              return acc;
            }, {});
    
            return <SubscribedComponent {...this.props} {...mappedContainers} />;
          }}
        </Subscribe>
      );
    }
  }

  return hoistNonReactStatics(Subscriber, SubscribedComponent)
};
