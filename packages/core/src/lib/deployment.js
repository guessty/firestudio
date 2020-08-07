const writeFileSync = require('fs').writeFileSync;
const path = require('path');
const getRewrites = require('./utils/get-rewrites');
//

const getDynamicSource = function(route) {
  const splitRoute = route.split('/');
  return splitRoute.map(function(element) {
    return element.includes(':') ? '**' : element;
  }).join('/');
}

const normaliseRoute = function(route) {
  return route.replace(/\.[^/.]+$/, '')
    .replace('/index', '')
    .replace('/_', '/:');
}

const buildFirebaserc = function(config) {
  const firepressConfig = Object.assign({}, {
    cloudRenderedPages: [],
    firebaseConfig: {},
  }, config.firepress || {});

  const firebaserc = JSON.stringify({
    projects: {
      default: firepressConfig.firebaseConfig.projectId
    }
  }, null, 2);
  
  return firebaserc;
}

const buildJson = function(outdir, config) {
  let customFunctions = {}
  try {
    customFunctions = require(`${outdir}/functions/apis`).default;
  } catch {
    console.log('> no custom functions to rewrite')
  }
  const functionRewrites = Object.keys(customFunctions).map((key) => {
    return {
      source: `/api/${key}`,
      function: key,
    }
  })

  const routes = config.env.ROUTES
  const firepressConfig = Object.assign({
    cloudRenderedPages: [],
    headers: [],
  }, config.firepress || {});

  const pageRewrites = getRewrites(routes, config);

  const cloudRewrites = []
  firepressConfig.cloudRenderedPages.forEach(function(route) {
    const source = getDynamicSource(normaliseRoute(route))
    cloudRewrites.push({
      source,
      function: 'pageRenderer',
    })
  }) 

  const combinedRewrites = [];
  pageRewrites.forEach(function(rewrite) {
    combinedRewrites.push(rewrite);
  })
  cloudRewrites.forEach(function(rewrite) {
    combinedRewrites.push(rewrite);
  })
  functionRewrites.forEach(function(rewrite) {
    combinedRewrites.push(rewrite);
  })

  const firebaseHostingConfig = {
    hosting: {
      headers: firepressConfig.headers,
      cleanUrls: true,
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites: combinedRewrites,
    }
  }
  const firebaseFunctionsConfig = cloudRewrites.length || functionRewrites.length ? { functions: { source: 'functions' } } : {}

  return JSON.stringify(Object.assign({}, firebaseHostingConfig, firebaseFunctionsConfig), null, 2);
}

module.exports = function buildDeploymentConfig (outdir, config) {
  writeFileSync(path.join(outdir, '.firebaserc'), buildFirebaserc(config), 'utf8');
  console.log(`.firebaserc was created in ${outdir}`);
  const firebaseJson = buildJson(outdir, config);
  writeFileSync(path.join(outdir, '/firebase.json'), firebaseJson, 'utf8');
  console.log(`firebase.json was created in ${outdir}`);
}
