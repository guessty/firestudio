import Store, { Container } from '@store';
import { Api } from '@store/containers';
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
      signInSuccessWithAuthResult: ({ user }) => {
        const store = Store.getOrCreateStore();
        const auth = store.Auth;
        const api = store.Api;

        return user.getIdToken()
          .then(idToken => api.request({
            method: 'post',
            url: Api.ROUTES.LOGIN,
            data: {
              idToken,
            },
          }, 'login', 'first'))
          .then(({ data }) => {
            firebase.auth().signOut();
            auth.setUser(data);

            return false;
          });
      },
    },
  }

  state = {
    user: null,
  }

  auth = () => {
    const instance = firebase.auth();
    instance.setPersistence(firebase.auth.Auth.Persistence.NONE);

    return instance;
  }

  setUser = async (user) => {
    await this.setState({ user });
    if (!user && typeof window !== 'undefined') {
      window.location.replace('/');
    }
  }

  getUser = () => {
    const api = Store.getOrCreateStore().Api;

    return api.request({
      method: 'get',
      url: Api.ROUTES.USER,
    }, 'user', 'first')
      .then(({ data: user }) => {
        this.setUser(user);
      });
  }

  signOut = () => {
    const api = Store.getOrCreateStore().Api;

    return api.request({
      method: 'post',
      url: Api.ROUTES.LOGOUT,
    }, 'logout', 'first')
      .then(() => {
        this.setUser(null);
      });
  }
}
