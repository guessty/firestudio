import React from 'react';
//
import Loader from '@elements/Loader';
import { Auth } from '@store';
import { subscribe } from '@store/store';
//

export default (Component, props = {
  invertLoader: false,
}) => {
  class AuthContainer extends React.Component {
    state = {
      ready: false,
    }

    unregisterAuthObserver = null

    componentDidMount() {
      const { auth } = this.props;

      this.unregisterAuthObserver = auth.onAuthStateChanged();
      this.setState({
        ready: true,
      });
    }

    componentWillUnmount() {
      this.unregisterAuthObserver();
    }

    render() {
      const { auth, auth: { state: { user } }, ...remainingProps } = this.props;
      const { ready } = this.state;

      return ready && typeof user !== 'undefined' ? (
        <Component user={user} auth={auth} uiConfig={Auth.uiConfig} {...remainingProps} />
      ) : (
        <div className="flex flex-col justify-center h-full">
          <Loader invert={props.invertLoader} />
        </div>
      );
    }
  }

  return subscribe({ auth: Auth })(AuthContainer);
};
