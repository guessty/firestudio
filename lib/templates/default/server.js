const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nextSPA = require('next-spa').default;
const buildDevFunctions = require('next-fire').default;

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT, 10) || 3000;
const app = nextSPA({ dev });
const handler = app.getRequestHandler();

const dir = path.resolve(process.argv.slice(2)[0] || '.');

buildDevFunctions(dir)
  .then((functions) => {
    app.prepare()
      .then(() => {
        const server = express();

        server.use(bodyParser.urlencoded({
          extended: true,
        }));

        server.use(bodyParser.json());

        Object.keys(functions).forEach((key) => {
          server.all(`/api/functions/${key}`, functions[key]);
        });

        server.get('*', (req, res) => handler(req, res));

        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`> Ready on http://localhost:${port}`);
        });
      });
  });
