import firebase from 'firebase/app';
import 'firebase/auth';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(process.env.FIREBASE);
}

export default firebase;
