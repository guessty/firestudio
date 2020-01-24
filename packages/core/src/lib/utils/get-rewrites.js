

const getDynamicSource = function(route) {
  const splitRoute = route.split('/');
  return splitRoute.map((element) => {
    return element.includes(':') ? '**' : element;
  }).join('/');
};

module.exports = function(routes, config) {
  const staticRewrites = routes.filter(route => !(route.pattern.includes('/:') || route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .map(route => ({
      source: route.pattern,
      destination: `${route.page === '/' ? '/index.html' : `${route.page}.html`}`,
    }))
  
  const dynamicRewrites = routes.filter(route => (route.pattern.includes('/:') && !route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .map(route => ({
      source: getDynamicSource(route.pattern),
      destination: `${route.page}.html`,
    }))

  const catchAnyRewrites = routes.filter(route => (route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .map(route => ({
      source: getDynamicSource(route.pattern),
      destination: `${route.page.replace(/\*/g, '')}.html`,
    }))

  return [
    ...staticRewrites,
    ...dynamicRewrites,
    ...catchAnyRewrites,
  ];
}