import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firestudio/core/router';
//
import Transition from '../../Transition';

export default class PageTransition extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transition: PropTypes.shape({}),
  }

  static defaultProps = {
    transition: {
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
    const { children, transition } = this.props;
    const { router, wasTriggeredByBrowser } = this.state;

    return router && !wasTriggeredByBrowser ? (
      <Transition.Group className="application__page-transition">
        <Transition
          key={router.asPath}
          {...transition}
          {...transition.enterTransition ? {
            enterTransition: {
              ...transition.enterTransition,
              absolute: true,
            }
          } : {}}
        >
          <div className="application__page-transition">
            {children}
          </div>
        </Transition>
      </Transition.Group>
    ) : (
      <div className="application__page-transition">
        {children}
      </div>
    );
  }
}
