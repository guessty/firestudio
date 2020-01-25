import React, { Component } from 'react';
import {
  Flex, Clickable, Avatar, Loader,
} from '@firepress/ui';
//
import firebase from '@config/firebase';
import Link from '@elements/Link';
//

export default class SignInOutButton extends Component {
  state = {
    isReady: false,
    isSignedIn: false,
  }

  unregisterAuthObserver = null

  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isSignedIn: Boolean(user),
        isReady: true,
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isReady, isSignedIn } = this.state;

    if (!isReady) {
      return (
        <Flex className="justify-center h-full flex-grow">
          <Loader />
        </Flex>
      );
    }

    return isSignedIn ? (
      <Flex className="flex-row gap-between-4">
        <Avatar {...firebase.auth().currentUser} />
        <div className="block border-r border-black w-1 h-10" />
        <Clickable
          styledAs="button"
          className="text-white border rounded border-white bg-gray-800 hocus:bg-gray-700 px-6"
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </Clickable>
      </Flex>
    ) : (
      <Link
        href="/sign-in"
        styledAs="button"
        className="text-white border rounded border-white bg-gray-800 hocus:bg-gray-700 px-6"
      >
        Sign In
      </Link>
    );
  }
}
