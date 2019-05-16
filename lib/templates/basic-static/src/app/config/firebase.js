import firebase from 'firebase/app';
import 'firebase/auth';
import getConfig from 'next/config';

if (typeof window !== 'undefined') {
  const { publicRuntimeConfig } = getConfig();

  if (!firebase.apps.length) {
    firebase.initializeApp(publicRuntimeConfig.FIREBASE);
  }
}

export default firebase;
