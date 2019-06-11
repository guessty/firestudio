import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firestudio/core/router';
//
import Transition from '../Transition';

export default class PageTransition extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    transitionProps: PropTypes.shape({}),
  }

  static defaultProps = {
    className: '',
    transitionProps: {
      enterTransition: {
        fade: true,
        absolute: true,
        speed: 'normal',
        delay: 'medium',
      },
      exitTransition: {
        fade: true,
        speed: 'normal',
      },
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { router } = state;

    if (router) {
      return {
        currentPath: router.asPath,
      }
    } 

    return state;
  }

  state = {
    wasTriggeredByBrowser: false,
    router: undefined,
    currentPath: undefined,
  }

  componentDidMount() {
    Router.beforePopState(({ url, as, options }) => {
      this.setState({
        wasTriggeredByBrowser: true,
      })
      return true
    });
    this.setState({
      router: Router.router,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { wasTriggeredByBrowser, currentPath } = this.state;
    if (wasTriggeredByBrowser && currentPath !== prevState.currentPath) {
      this.setState({
        wasTriggeredByBrowser: false,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { currentPath } = this.state;

    if (currentPath === nextState.currentPath && nextState.wasTriggeredByBrowser) {
      return false;
    }

    return true;
  }

  render() {
    const { children, className, transitionProps } = this.props;
    const { router, wasTriggeredByBrowser } = this.state;

    return router && !wasTriggeredByBrowser ? (
      <Transition.Group className={className}>
        <Transition
          key={router.asPath}
          {...transitionProps}
          {...transitionProps.enterTransition ? {
            enterTransition: {
              ...transitionProps.enterTransition,
              absolute: true,
            }
          } : {}}
        >
          <div className={className}>
            {children}
          </div>
        </Transition>
      </Transition.Group>
    ) : (
      <div className={className}>
        {children}
      </div>
    );
  }
}
