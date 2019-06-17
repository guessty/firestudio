const express = require('express');
const initDevEnv = require('@firestudio/core/dev');
const next = require('next');
const admin = require('firebase-admin');

const conf = require('../next.config');
const babelConfig = require('../babel.config');

require('@babel/register')({
  ...babelConfig,
  babelrc: false,
  only: ['src/functions', 'src/app/config'],
});

let firebaseConfig;
try {
  firebaseConfig = require('../config/firebase.config');
} catch {
  firebaseConfig = undefined;
  console.log('\x1b[31m%s\x1b[0m', '[Firestudio] You need to add firebase config to connect to firebase services');
}

let credential;
try {
  credential = admin.credential.applicationDefault();
} catch {
  credential = undefined;
  console.log('\x1b[31m%s\x1b[0m', '[Firestudio] You need to grant your development environment access to Firebase services. Register your app as a service account and generate a private key.');
}

if (firebaseConfig) {
  admin.initializeApp({
    ...credential ? { credential } : {},
    ...firebaseConfig,
  });
}

const server = express();
initDevEnv({ conf })(next)(server);
