import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Configure Firebase.
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
};


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firebase;
