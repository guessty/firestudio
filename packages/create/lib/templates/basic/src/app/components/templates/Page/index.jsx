import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Flex, Transition } from '@firestudio/ui';
import { Router } from '@firestudio/core';
//
import Nav from '@partials/Nav';
import Footer from '@partials/Footer';

require('./Page.scss');

export default class Page extends Component{
  static propTypes = {
    router: PropTypes.shape({}).isRequired,
  }

  static getDerivedStateFromProps(props, state) {
    const { router } = props;
    const { currentPath } = state;

    return (router && router.asPath !== currentPath) ? {
      currentPath: router.asPath,
      previousPath: currentPath,
    } : state;
  }

  state = {
    wasTriggeredByBrowser: false,
    currentPath: undefined,
    previousPath: undefined,
  }

  componentDidMount() {
    Router.beforePopState(({ url, as, options }) => {
      this.setState({
        wasTriggeredByBrowser: true,
      })
      return true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { wasTriggeredByBrowser, currentPath, previousPath } = this.state;
    if (wasTriggeredByBrowser && currentPath !== prevState.currentPath) {
      this.setState({
        wasTriggeredByBrowser: false,
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { currentPath } = this.state;

    if (currentPath === nextState.currentPath) {
      return false;
    }

    return true;
  }

  render() {
    const { children, router } = this.props;
    const { previousPath, currentPath, wasTriggeredByBrowser } = this.state;

    console.log(previousPath, currentPath, wasTriggeredByBrowser);

    return (
      <div className="Page">
        <Nav />
        {!wasTriggeredByBrowser ? (
          <Transition.Group className="flex w-full">
            <Transition
              key={router.asPath}
              enterTransition={{
                fade: true,
                absolute: true,
                // type: 'slide',
                // direction: 'left',
                speed: 'slow',
              }}
              exitTransition={{
                fade: true,
                // type: 'slide',
                // direction: 'left',
                speed: 'instant',
              }}
            >
              <Flex className="w-full">
                {children}
              </Flex>
            </Transition>
          </Transition.Group>
        ) : (
          <div className="flex w-full">
            <Flex className="w-full">
              {children}
            </Flex>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
