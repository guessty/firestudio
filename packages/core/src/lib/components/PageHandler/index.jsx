import React, { Component } from 'react';
import PropTypes from 'prop-types';
//

export default class PageHandler extends Component {
  static propTypes = {
    router: PropTypes.shape({}).isRequired,
    render: PropTypes.func.isRequired,
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

  // static getDerivedStateFromProps(props, state) {
  //   const { router } = state;

  //   if (router) {
  //     return {
  //       currentPath: router.asPath,
  //     }
  //   } 

  //   return state;
  // }

  state = {
    wasTriggeredByBrowser: false,
  }

  componentDidMount() {
    const { router } = this.props;
    console.log('mounted');
    router.beforePopState(() => {
      setTimeout(() => {
        this.setState({
          wasTriggeredByBrowser: true,
        })
      }, 0)
      document.getElementById('pageContent').style.cssText = `
        visibility: hidden;
      `;
      console.log('browser')
      return true
    });
  }

  componentWillUnmount() {
    console.log('unmounted');
  }

  componentDidUpdate(prevProps, prevState) {
    const { router } = this.props;
    const { wasTriggeredByBrowser } = this.state;

    console.log(router.router.asPath, prevProps.router.router.asPath, wasTriggeredByBrowser)

    if (router.router.asPath !== prevProps.router.router.asPath) {
      // this.setState({
      //   wasTriggeredByBrowser: false,
      // })
      document.getElementById('pageContent').style.cssText = `
        visibility: visible;
      `;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { router } = this.props;

    console.log(router, nextProps.router, nextState.wasTriggeredByBrowser);

    // if (router.router.asPath !== nextProps.router.router.asPath) {
    //   return true;
    // }

    return true;
  }

  render() {
    const { render, transition } = this.props;
    const { currentPath, wasTriggeredByBrowser } = this.state;

    console.log(wasTriggeredByBrowser);

    // return currentPath && !wasTriggeredByBrowser ? (
    //   <Transition.Group className="application__page-transition">
    //     <Transition
    //       key={currentPath}
    //       {...transition}
    //       {...transition.enterTransition ? {
    //         enterTransition: {
    //           ...transition.enterTransition,
    //           absolute: true,
    //         }
    //       } : {}}
    //     >
    //       <div className="application__page-transition">
    //         {children}
    //       </div>
    //     </Transition>
    //   </Transition.Group>
    // ) : 
    
    return (
      <div
        id="pageContent"
        className="application__page-transition"
        // style={{ visibility: 'hidden' }}
      >
        {render({ wasLoadedFromCache: wasTriggeredByBrowser })}
      </div>
    );
  }
}
