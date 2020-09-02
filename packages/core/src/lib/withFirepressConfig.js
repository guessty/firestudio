const path = require('path');
const fs = require('fs');
const parseArgs = require('minimist');
//

const normalizePath = inputPath => inputPath.replace(/\\/g, '/');

const generateDirRoutes = (dir, pathString = undefined, routes = []) => {
  const normalizedPath = normalizePath(dir);
  const stats = fs.statSync(normalizedPath);
  const baseName = path.basename(dir);
  if (stats.isDirectory() && baseName !== '__tests__' && baseName !== 'api') {
    let nextPathString = '';
    if (pathString !== undefined) {
      nextPathString = `${pathString}/${baseName}`;
    }
    const children = fs.readdirSync(normalizedPath);

    children.forEach((child) => {
      generateDirRoutes(path.join(dir, child), nextPathString, routes);
    });
  } else if (stats.isFile()) {
    const fileString = `${pathString}/${baseName}`;
    const page = fileString.replace(/\.[^/.]+$/, '');

    if (page === '/index') {
      const route = {
        pattern: '/',
        page: '/',
      };
      routes.push(route);
    } else if (page !== '/_app' && page !== '/_document' && page !== '/_error') {
      let pattern = page.replace('/index', '');
      if (pattern.includes('[...')) {
        pattern = `${pattern}*`.replace(/\/\[\.\.\./g, '/_')
      }
      pattern = pattern.replace(/\]/g, '').replace(/\/\[/g, '/_').replace(/\/_/g, '/:');
      const route = {
        pattern,
        page: page.replace('/index', ''),
      };
      routes.push(route);
    }
  }

  return routes;
};

const withFirepressConfig = (config = {}) => {
  const argv = parseArgs(process.argv.slice(2), {});
  let argvPath = argv._[0] || '.';

  if (['dev', 'build', 'export'].includes(argv._[0])) {
    argvPath = argv._[1] || '.';
  }

  const baseNextConfig = {
    assetPrefix: '',
    webpack: webpackConfig => webpackConfig,
    ...config,
    firepress: {
      fallback: '/404.html',
      ...config.firepress || {},
    },
    distDir: config.distDir && config.distDir !== '.' && config.distDir !== './'
      ? config.distDir : './.next',
  };

  const firepressConfig = config.firepress || {};

  let pagesDir = path.join(path.resolve(argvPath), 'pages');
  const isBuild = argvPath === config.distDir;
  if (isBuild || firepressConfig.generateRoutesFromBuild) {
    const buildId = fs.readFileSync(`${config.distDir}/BUILD_ID`, 'utf8');
    pagesDir = path.join(path.resolve(config.distDir), `static/${buildId}/pages`);
  }
  const routes = generateDirRoutes(pagesDir);

  const nextConfig = {
    ...baseNextConfig,
    distDir: path.relative(path.resolve(argvPath), path.resolve(baseNextConfig.distDir)),
    env: {
      ...baseNextConfig.env,
      FIREBASE: firepressConfig.firebaseConfig || {},
      ROUTES: routes,
    },
    generateBuildId: () => 'build',
  };

  return nextConfig;
};

export default withFirepressConfig;
