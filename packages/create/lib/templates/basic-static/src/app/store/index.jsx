import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Store from '@firestudio/core/store';
import * as uiContainers from '@firestudio/ui/containers';
//
import * as containers from './containers';

export const Containers = containers;

export default class FirestudioStore extends PureComponent {
  static propTypes = {
    initialData: PropTypes.shape({}),
  }

  static defaultProps = {
    initialData: {},
  }

  render() {
    const { children, initialData } = this.props;

    return (
      <Store containers={{ ...containers, ...uiContainers }} initialData={initialData}>
        {children}
      </Store>
    );
  }
}
