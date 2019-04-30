import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import nextSPA, { withSPA } from 'next-spa';
//
import functionRoutes from './routes';

admin.initializeApp();

// All functions will recieve an express(like) request and response
// and can be called from the app using the path '/api/functions/<functionName>'

const nextConfig = withSPA({
  distDir: './build',
  nextSPA: {
    generateRoutesFromBuild: true,
  },
});

export const firestudioApp = functions.https.onRequest((req, res) => {
  const nextApp = nextSPA({
    dev: false,
    conf: nextConfig,
  });
  const handler = nextApp.getRequestHandler();
  console.log(`File: ${req.originalUrl}`); // eslint-disable-line no-console

  return nextApp.prepare().then(() => handler(req, res));
});

Object.keys(functionRoutes).forEach((key) => {
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions.https.onRequest(functionRoutes[key]);
    },
  });
});
