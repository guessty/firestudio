import React, { Component } from 'react';
import cookies from 'browser-cookies';
//
import Loader from '@elements/Loader';
import { Auth } from '@store/containers';
import { subscribe } from '@store';
//

export default (WrappedComponent, props = {
  invertLoader: false,
}) => {
  class ComponentWithAuth extends Component {
    static COOKIES = {
      IS_AUTHENTICATED: 'isAuthenticated',
    }

    state = {
      ready: false,
    }

    unregisterAuthObserver = null

    async componentDidMount() {
      const { auth } = this.props;

      const isAuthenticatedCookie = cookies.get(ComponentWithAuth.COOKIES.IS_AUTHENTICATED);

      if (!auth.state.user && isAuthenticatedCookie) {
        await auth.getUser();
      }

      this.setState({
        ready: true,
      });
    }

    render() {
      const { auth, auth: { state: { user } }, ...remainingProps } = this.props;
      const { ready } = this.state;

      return ready && typeof user !== 'undefined' ? (
        <WrappedComponent user={user} auth={auth} uiConfig={Auth.uiConfig} {...remainingProps} />
      ) : (
        <div className="flex flex-col justify-center h-full">
          <Loader invert={props.invertLoader} />
        </div>
      );
    }
  }

  return subscribe({ auth: Auth })(ComponentWithAuth);
};
