import firebase from 'firebase/app';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  const firebaseConfig = process.env.FIREBASE;
  if (Object.entries(firebaseConfig).length === 0 && firebaseConfig.constructor === Object) {
    firebase.initializeApp(firebaseConfig);
  }
}

export default firebase;
