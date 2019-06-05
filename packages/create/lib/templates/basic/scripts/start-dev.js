const express = require('express');
const initFirestudio = require('@firestudio/core').default;
const next = require('next');
const admin = require('firebase-admin');

const conf = require('../next.config');
const babelConfig = require('../babel.config');

require('@babel/register')({
  ...babelConfig,
  babelrc: false,
  only: ['src/functions', 'src/app/config'],
});

const firebaseConfig = require('../config/firebase.config');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  authDomain: firebaseConfig.authDomain,
});

const server = express();
initFirestudio({ conf })(next)(server);
