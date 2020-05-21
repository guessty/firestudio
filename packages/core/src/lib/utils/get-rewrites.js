

const getDynamicSource = function(route) {
  const splitRoute = route.split('/');
  return splitRoute.map((element) => {
    return element.includes(':') ? '**' : element;
  }).join('/');
};

module.exports = function(routes, config) {
  const fallback = config.firepress.fallback || '/404.html';
  const fallbackDestination = `${fallback.replace('.html', '')}.html`;

  const dynamicRewrites = routes.filter(route => (route.pattern.includes('/:') && !route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .map(route => ({
      source: getDynamicSource(route.pattern),
      destination: fallbackDestination,
    }))

  const catchAnyRewrites = routes.filter(route => (route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .map(route => ({
      source: getDynamicSource(route.pattern),
      destination: fallbackDestination,
    }))

  return [
    ...dynamicRewrites,
    ...catchAnyRewrites,
  ];
}