const path = require('path');
const next = require('next');
const parseArgs = require('minimist');

import buildRoutes from './routes';

const buildApp = (opts) => {
  const argv = parseArgs(process.argv.slice(2), {})
  let dir = argv._[0] || '.'

  if (['dev', 'build', 'export'].includes(argv._[0])) {
    dir = argv._[1] || '.'
  }

  const conf = {
    ...opts.conf ? opts.conf : {},
    ...opts.dev ? { distDir: path.relative(dir, path.resolve('./tmp/.next')) } : {}
  };

  const app = next({ ...opts, dir, conf, });

  const { env: { ROUTES } } = conf || {};
  const Routes = buildRoutes(ROUTES)
  const handler = Routes.getRequestHandler(app)

  app.getRequestHandler = () => handler

  return app;
}

export default buildApp;
