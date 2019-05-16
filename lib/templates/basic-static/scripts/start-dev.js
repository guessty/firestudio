const express = require('express');
const bodyParser = require('body-parser');
const nextSPA = require('next-spa').default;
const admin = require('firebase-admin');

const config = require('../next.config');
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
// const functionRoutes = require('../src/functions/routes').default;

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3030;
const app = nextSPA({ dev, config });
const handler = app.getRequestHandler();


app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({
      extended: true,
    }));

    server.use(bodyParser.json());

    // Object.keys(functionRoutes).forEach((key) => {
    //   server.all(`/api/functions/${key}`, functionRoutes[key]);
    // });

    server.get('*', (req, res) => handler(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  });
