const bodyParser = require('body-parser');
//
import buildApp from './build/app';

export default ({
  conf,
  hostname = 'localhost',
  port = 3040,
  functionRoutes,
}) => server => {
  const app = buildApp({ dev: true, conf });
  const handler = app.getRequestHandler();

  app.prepare()
    .then(() => {
      server.use(bodyParser.urlencoded({
        extended: true,
      }));
  
      server.use(bodyParser.json());
  
      if (functionRoutes) {
        Object.keys(functionRoutes).forEach((key) => {
          server.all(`/api/functions/${key}`, functionRoutes[key]);
        });
      }
  
      server.get('*', (req, res) => handler(req, res));
  
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://${hostname}:${port}`);
      });
    })
    .catch((error) => {
      console.log('error', error)
    });

  return app;
}
