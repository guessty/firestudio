import React, { PureComponent } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Container, Flex, Hr } from '@firepress/ui';
//
import firebase from '@config/firebase';

class SignIn extends PureComponent {
  state = {
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  renderSignInForm() {
    const { PageLoader } = this.props;
    const { isMounted } = this.state;

    if (!isMounted) {
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
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/',
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
    return (
      <Flex className="flex-grow sm:bg-gray-800">
        <Container className="items-center sm:pt-8">
          <Flex className="gap-around-8 w-full sm:max-w-md bg-white">
            <h1 className="text-4xl text-center font-semibold">Sign In</h1>
            <Hr />
            <Flex className="items-center justify-center">
              {this.renderSignInForm()}
            </Flex>
          </Flex>
        </Container>
      </Flex>
    );
  }
}

export default SignIn;
