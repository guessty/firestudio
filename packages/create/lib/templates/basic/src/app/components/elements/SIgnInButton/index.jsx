import React, { Component } from 'react';
import {
  Flex, Clickable, Avatar, Loader,
} from '@firestudio/ui';
//
import firebase from '@config/firebase';
//
require('./SignInButton.scss');
//

class AuthNav extends Component {
  state = {
    isReady: false,
  }

  unregisterAuthObserver = null

  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(() => {
      this.setState({
        isReady: true,
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <Flex className="justify-center h-full flex-grow">
          <Loader />
        </Flex>
      );
    }

    return firebase.auth().currentUser ? (
      <Avatar {...firebase.auth().currentUser} />
    ) : (
      <Clickable
        as="a"
        styledAs="button"
        href="/sign-in"
        className="text-white border rounded border-white bg-blue-800 hocus:bg-blue-700 px-6"
      >
        Sign In
      </Clickable>
    );
  }
}

export default AuthNav;
