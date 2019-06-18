import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from '@firestudio/core/store';
import * as uiStore from '../../store';
import PageTransition from './PageTransition';

export default class Application extends Component {
  static propTypes = {
    initialStoreData: PropTypes.shape({}),
    store: PropTypes.shape({}),
    className: PropTypes.string,
  }

  static defaultProps = {
    initialData: {},
    store: {},
    className: '',
  }

  static Window = ({ children }) => (
    <div className="application__window">
      {children}
    </div>
  )

  static PageTransition = PageTransition 

  render() {
    const { children, initialStoreData, store } = this.props;

    return (
      <Store containers={{ ...store, ...uiStore }} initialData={initialStoreData}>
        <div className="application">
          {children}
        </div>
      </Store>
    );
  }
}