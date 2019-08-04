import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import coreFunctions from '@firestudio/core/functions';
//
import apiFunctions from './apis';

admin.initializeApp();

const cloudFunctions = {
  ...apiFunctions,
  ...coreFunctions,
};

Object.keys(cloudFunctions).forEach((key) => {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(cloudFunctions[key]);
    },
  });
});
