

// This file is needed to make firebase services available to the client.
// Add a firebase.config.js in the /config folder which exports the following:

const firebaseConfig = {
  apiKey: <apiKey>,
  authDomain: <authDomain>,
  databaseURL: <databaseURL>,
  projectId: <projectId>,
  storageBucket: <storageBucket>,
  messagingSenderId: <messagingSenderId>,
  appId: <appId>
};

module.exports = firebaseConfig;
