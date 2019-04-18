import { Container } from '@store/store';
import firebase from '@config/firebase';

export default class Auth extends Container {
  static uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }

  static getIdToken = () => new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        user.getIdToken().then((idToken) => {
          resolve(idToken);
        }, () => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }).catch((error) => {
    console.log(error);
  });

  state = {
    user: undefined,
  }

  auth = firebase.auth

  onAuthStateChanged = () => this.auth().onAuthStateChanged(
    (user) => {
      this.setState({ user });
    },
  )

  currentUser = this.auth().currentUser

  signOut = () => this.auth().signOut()
}
