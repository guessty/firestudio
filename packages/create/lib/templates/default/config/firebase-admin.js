const admin = require('firebase-admin');
const babelConfig = require('../babel.config');

// eslint-disable-next-line import/no-extraneous-dependencies
require('@babel/register')({
  ...babelConfig,
  babelrc: false,
  only: ['src/functions', 'src/app/config'],
});

let firebaseConfig;
try {
  // eslint-disable-next-line global-require
  firebaseConfig = require('./firebase.config');
} catch {
  firebaseConfig = undefined;
  // eslint-disable-next-line no-console
  console.log('\x1b[31m%s\x1b[0m', '[Firepress] You need to add firebase config to connect to firebase services');
}

let credential;
let serviceAccount;
try {
  // eslint-disable-next-line global-require
  serviceAccount = require('./service-account.json');
  credential = admin.credential.cert(serviceAccount);
} catch {
  credential = undefined;
  // eslint-disable-next-line no-console
  console.log('\x1b[31m%s\x1b[0m', '[Firepress] You need to grant your development environment access to Firebase services. Register your app as a service account and generate a private key.');
}

if (!admin.apps.length) {
  admin.initializeApp({
    ...credential ? { credential } : {},
    ...firebaseConfig || {},
  });
}

module.exports = admin;
