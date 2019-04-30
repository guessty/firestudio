const writeFileSync = require('fs').writeFileSync;
const path = require('path');
const getRewrites = require('./../../utils/get-spa-rewrites');
//

const getDynamicSource = function(route) {
  const splitRoute = route.split('/');
  return splitRoute.map(function(element) {
    return element.includes(':') ? '**' : element;
  }).join('/');
}

const buildFirebaserc = function(config) {
  const fireStudioConfig = Object.assign({}, {
    cloudRenderedRoutes: [],
  }, config.firestudio || {});

  const firebaserc = JSON.stringify({
    projects: {
      default: fireStudioConfig.projectId
    }
  }, null, 2);
  
  return firebaserc;
}

const buildJson = function(outdir, config) {
  let customFunctions = {}
  try {
    customFunctions = require(`${outdir}/functions/routes`).default;
  } catch {
    console.log('> no custom functions to rewrite')
  }
  const functionRewrites = Object.keys(customFunctions).map((key) => {
    return {
      source: `/api/functions/${key}`,
      function: key,
    }
  })

  const routes = config.publicRuntimeConfig.routes
  const fireStudioConfig = Object.assign({
    cloudRenderedRoutes: [],
    headers: [],
  }, config.firestudio || {});

  const { staticRewrites, dynamicRewrites } = getRewrites(routes, config);

  if (fireStudioConfig.cloudRenderAllDynamicRoutes) {
    dynamicRewrites = dynamicRewrites.map(function(rewrite) {
      return {
        source: rewrite.source,
        function: 'firestudioApp'
      };
    });
  }

  const normalisedCloudRenderedRoutes = fireStudioConfig.cloudRenderedRoutes.map(function(route) {
    return route.replace(/\.[^/.]+$/, '')
      .replace('/index', '')
      .replace('/_', '/:')
    });

  const cloudRewrites = []
  normalisedCloudRenderedRoutes.forEach(function(route) {
    if (config.exportPathMap[route]) {
      const source = getDynamicSource(route)
      cloudRewrites.push({
        source,
        function: 'firestudioApp',
      })
    }
  }) 

  const combinedRewites = [];
  staticRewrites.forEach(function(rewrite) {
    combinedRewites.push(rewrite);
  })
  cloudRewrites.forEach(function(rewrite) {
    combinedRewites.push(rewrite);
  })
  functionRewrites.forEach(function(rewrite) {
    combinedRewites.push(rewrite);
  })
  dynamicRewrites.forEach(function(rewrite) {
    combinedRewites.push(rewrite);
  })


  const firebaseHostingConfig = {
    hosting: {
      headers: fireStudioConfig.headers,
      public: 'public',
      ignore: [
        'firebase.json',
        '**/.*',
        '**/node_nodules/**'
      ],
      rewrites: combinedRewites,
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
