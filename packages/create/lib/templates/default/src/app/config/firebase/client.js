const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

if (process.browser && !firebase.apps.length) {
  firebase.initializeApp(process.env.FIREBASE);
}

module.exports = firebase;
