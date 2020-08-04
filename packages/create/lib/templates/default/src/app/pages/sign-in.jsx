import React, { PureComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Router from '@firepress/core/router';
import { Container, Flex, Hr } from '@firepress/ui';
//
import firebase from '@config/firebase';
import SignInOutButton from '@elements/SignInOutButton';

export default class SignIn extends PureComponent {
  unregisterAuthObserver = null;

  state = {
    isReady: false,
    isSignedIn: false,
  };

  async componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        isReady: true,
        isSignedIn: Boolean(user),
      });
    });
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  renderSignInForm() {
    const { PageLoader } = this.props;
    const { isReady } = this.state;

    if (!isReady) {
      return (
        <PageLoader />
      );
    }

    const uiConfig = {
      // Popup signin flow rather than redirect flow.
      signInFlow: 'popup',
      // We will display Google and Facebook as auth providers.
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: Router.router.query.redirect || '/',
      // callbacks: {
      //   // Avoid redirects after sign-in.
      //   signInSuccessWithAuthResult: () => false,
      // },
      // Terms of service url/callback.
      tosUrl: '/terms-and-conditions',
      // Privacy policy url/callback.
      privacyPolicyUrl: '/privacy-policy',
    };

    return (
      <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebase.auth()}
      />
    );
  }

  render() {
    const { isSignedIn } = this.state;

    return (
      <Flex className="flex-grow sm:bg-gray-950">
        <Container className="items-center sm:pt-8">
          <Flex className="flex-gap-8 p-8 w-full sm:max-w-md bg-white">
            <h1 className="text-4xl text-center font-semibold">Sign In</h1>
            <Hr />
            <Flex className="items-center justify-center">
              {isSignedIn ? (
                <SignInOutButton />
              ) : this.renderSignInForm()}
            </Flex>
          </Flex>
        </Container>
      </Flex>
    );
  }
}
