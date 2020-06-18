import React from 'react';
import { pathToRegexp, compile } from 'path-to-regexp';
import parseUrl from 'url-parse';
import queryString from 'query-string';
import NextLink from 'next/link';
import NextRouter from 'next/router';

const toQuerystring = obj => Object.keys(obj)
  .filter(key => obj[key] !== null && obj[key] !== undefined)
  .map((key) => {
    let value = obj[key];

    if (Array.isArray(value)) {
      value = value.join('/');
    }

    return [
      encodeURIComponent(key),
      encodeURIComponent(value),
    ].join('=');
  }).join('&');

class Route {
  constructor({
    pattern, page, redirectTo,
  }) {
    if (!page) {
      throw new Error(`Missing page to render for route "${pattern}"`);
    }

    this.pattern = pattern;
    this.page = page.replace(/(^|\/)index$/, '').replace(/^\/?/, '/');
    this.regex = pathToRegexp(this.pattern, this.keys = []);
    this.keyNames = this.keys.map(key => key.name);
    this.toPath = compile(this.pattern);
    this.redirectTo = redirectTo;
  }

  match(path) {
    const values = this.regex.exec(path);
    if (values) {
      return this.valuesToParams(values.slice(1));
    }

    return undefined;
  }

  valuesToParams(values) {
    return values.reduce((params, val, i) => {
      if (val === undefined) return params;

      return Object.assign(params, {
        [this.keys[i].name]: decodeURIComponent(val),
      });
    }, {});
  }

  getHref(params = {}) {
    return `${this.page}?${toQuerystring(params)}`;
  }

  getAs(params = {}) {
    const as = this.toPath(params) || '/';
    const keys = Object.keys(params);
    const qsKeys = keys.filter(key => this.keyNames.indexOf(key) === -1);

    if (!qsKeys.length) return as;

    const qsParams = qsKeys.reduce((qs, key) => Object.assign(qs, {
      [key]: params[key],
    }), {});

    return `${as}?${toQuerystring(qsParams)}`;
  }

  getUrls(params) {
    const as = this.getAs(params);
    const href = this.getHref(params);

    return { as, href };
  }
}

class Routes {
  constructor({
    Link = NextLink,
    Router = NextRouter,
  } = {}) {
    this.routes = [];
    this.Link = this.getLink(Link);
    this.Router = this.getRouter(Router);
  }

  add({
    name, pattern, page, redirectTo,
  }) {
    if (this.findByName(name)) {
      throw new Error(`Route "${name}" already exists`);
    }

    this.routes.push(new Route({
      name, pattern, page, redirectTo,
    }));

    return this;
  }

  findByName(name) {
    if (name) {
      return this.routes.filter(route => route.name === name)[0];
    }

    return undefined;
  }

  match(url) {
    const parsedUrl = parseUrl(url, true);
    const { pathname, query } = parsedUrl;

    return this.routes.reduce((result, route) => {
      if (result.route) return result;
      const params = route.match(pathname);
      if (!params) return result;

      return {
        ...result, route, params, query: { ...query, ...params },
      };
    }, { query, parsedUrl });
  }

  findAndGetUrls(nameOrUrl, params) {
    const route = this.findByName(nameOrUrl);

    if (route) {
      return { route, urls: route.getUrls(params), byName: true };
    }

    const { route: matchedRoute, query } = this.match(nameOrUrl);
    const href = matchedRoute ? matchedRoute.getHref(query) : nameOrUrl;
    const urls = { href, as: nameOrUrl };

    return { route, urls };
  }

  getLink(Link) {
    const LinkRoutes = (props) => {
      const {
        route, params, to, ...newProps
      } = props;
      const nameOrUrl = route || to;

      if (nameOrUrl) {
        Object.assign(newProps, this.findAndGetUrls(nameOrUrl, params).urls);
      }

      return <Link {...newProps} />;
    };

    return LinkRoutes;
  }

  getRouter(Router) {
    const wrap = method => (route, params, options) => {
      const { byName, urls: { as, href } } = this.findAndGetUrls(route, params);

      return Router[method](href, as, byName ? options : params);
    };

    Router.pushRoute = wrap('push'); // eslint-disable-line no-param-reassign
    Router.replaceRoute = wrap('replace'); // eslint-disable-line no-param-reassign
    Router.prefetchRoute = wrap('prefetch'); // eslint-disable-line no-param-reassign

    return Router;
  }
}

export const buildRoutes = (routes = []) => {
  const appRoutes = new Routes();

  routes.filter(route => !(route.pattern.includes('/:') || route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => { appRoutes.add(route); });

  routes.filter(route => (route.pattern.includes('/:') && !route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => { appRoutes.add(route); });

  routes.filter(route => (route.pattern.includes('*')))
    .sort((routeA, routeB) => routeA.pattern.split('/').length - routeB.pattern.split('/').length)
    .reverse()
    .forEach((route) => {
      appRoutes.add({
        ...route,
        pattern: route.pattern.replace(/:\*/g, ':_params*'),
      });
    });

  return appRoutes;
};

const getUpdatedPath = (path, params = {}) => {
  const { url, query = {} } = queryString.parseUrl(path);
  return queryString.stringifyUrl({
    url,
    query: {
      ...query,
      ...params
    },
  });
};

const SingletonRoutes = buildRoutes();
SingletonRoutes.isValidClientRoute = pathname => (
  SingletonRoutes.routes.find(route => route.match(pathname) !== undefined));
SingletonRoutes.Router.replaceQueryParams = (params = {}) => {
  const originalPath = SingletonRoutes.Router.asPath;
  const updatedPath = getUpdatedPath(originalPath, params);

  if (originalPath !== updatedPath) {
    SingletonRoutes.Router.replaceRoute(updatedPath, undefined, { shallow: true });
  }
};
SingletonRoutes.Router.pushQueryParams = (params = {}) => {
  const originalPath = SingletonRoutes.Router.asPath;
  const updatedPath = getUpdatedPath(originalPath, params);

  if (originalPath !== updatedPath) {
    SingletonRoutes.Router.pushRoute(updatedPath, undefined, { shallow: true });
  }
};

export const setRoutes = (routes = []) => {
  const newRoutes = buildRoutes(routes);
  SingletonRoutes.routes = newRoutes.routes;
  SingletonRoutes.Router.routes = SingletonRoutes.routes;
};

export const initRoutes = (routes = []) => {
  const originalPrototype = Object.getPrototypeOf(SingletonRoutes.Router.router);
  const originalSet = originalPrototype.set;
  function getRouteInfo(
    route,
    pathname,
    query,
    as,
    shallow = false,
  ) {
    const cachedRouteInfo = this.components[route];

    // If there is a shallow route transition possible
    // If the route is already rendered on the screen.
    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (
      err,
      loadErrorFail,
    ) => new Promise((resolve) => { // eslint-disable-line consistent-return
      if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
        // If we can't load the page it could be one of following reasons
        //  1. Page doesn't exists
        //  2. Page does exist in a different zone
        //  3. Internal error while loading the page

        // So, doing a hard reload is the proper way to deal with this.
        window.location.href = as;

        // Changing the URL doesn't block executing the current code path.
        // So, we need to mark it as a cancelled error and stop the routing logic.
        err.cancelled = true; // eslint-disable-line no-param-reassign
        // @ts-ignore TODO: fix the control flow here

        return resolve({ error: err });
      }

      if (err.cancelled) {
        // @ts-ignore TODO: fix the control flow here
        return resolve({ error: err });
      }

      resolve(
        this.fetchComponent('/_error')
          .then((res) => {
            const { page: Component } = res;
            const routeInfo = { Component, err };

            return new Promise((nResolve) => {
              this.getInitialProps(Component, {
                err,
                pathname,
                query,
              }).then(
                (props) => {
                  routeInfo.props = props;
                  routeInfo.error = err;
                  nResolve(routeInfo);
                },
                (gipErr) => {
                  console.error( // eslint-disable-line no-console
                    'Error in error page `getInitialProps`: ',
                    gipErr,
                  );
                  routeInfo.error = err;
                  routeInfo.props = {};
                  nResolve(routeInfo);
                },
              );
            });
          })
          .catch(nErr => handleError(nErr, true)),
      );
    });

    return (new Promise((resolve, reject) => { // eslint-disable-line consistent-return
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(
        res => resolve({
          Component: res.page,
          __N_SSG: res.mod.__N_SSG,
          __N_SSP: res.mod.__N_SSP,
        }), reject,
      );
    }))
      .then((routeInfo) => {
        const { Component, __N_SSG, __N_SSP } = routeInfo;

        if (process.env.NODE_ENV !== 'production') {
          const { isValidElementType } = require('react-is'); // eslint-disable-line global-require
          if (!isValidElementType(Component)) {
            throw new Error(
              `The default export is not a React Component in page: "${pathname}"`,
            );
          }
        }

        return this._getData(async () => {
          // handle redirect
          if (Component.redirectTo) {
            return { pageProps: { isPageLoading: true } };
          }

          if (__N_SSG) {
            try {
              let props = await this._getStaticData(as);
              if (props.pageProps.shouldGetStaticPropsForClient) {
                const { props: pageProps } = (
                  await Component.getStaticPropsForClient({ params: query }));
                props = {
                  ...props,
                  pageProps,
                };
                this.sdc[as] = props;
              }

              return props;
            } catch (err) {
              if (Component.getStaticPropsForClient) {
                const props = {
                  pageProps: { isPageLoading: true, shouldGetStaticPropsForClient: true },
                };
                this.sdc[as] = props;

                return props;
              }

              throw err;
            }
          }

          if (__N_SSP) {
            return this._getServerData(as);
          }

          return this.getInitialProps(
            Component,
            {
              pathname,
              query,
              asPath: as,
            },
          );
        }).then((props) => {
          routeInfo.props = props; // eslint-disable-line no-param-reassign
          this.components[route] = routeInfo;

          return routeInfo;
        });
      })
      .catch(handleError);
  }
  function newSetMethod(route, pathname, query, as, data) {
    const { Component } = data;
    const componentRedirectTo = Component.redirectTo === 'function'
      ? Component.redirectTo({ asPath: as, pathname, query }) : Component.redirectTo;

    const url = as.replace('index.html', '').replace('.html', '');
    const { pathname: asPathname, query: asQuery } = parseUrl(url, true);

    const filteredRoutes = SingletonRoutes.routes.filter(routesRoute => routesRoute.page === route);
    const matchedRoute = filteredRoutes.find(routesRoute => (
      routesRoute.match(asPathname) !== undefined));

    const { pattern, redirectTo: routeRedirectTo } = matchedRoute || {};
    const params = matchedRoute ? matchedRoute.match(asPathname) : {};

    let redirectTo = componentRedirectTo || routeRedirectTo;

    if (redirectTo) {
      const toPath = compile(redirectTo);
      redirectTo = toPath(params);
    }

    this.asPathname = asPathname;
    this.asQuery = asQuery;
    this.pattern = pattern;
    this.redirectTo = redirectTo;

    return originalSet.call(this, route, pathname, query, as, data).then((response) => {
      if (this.redirectTo) {
        SingletonRoutes.Router.replaceRoute(this.redirectTo);
      } else if (data.props.pageProps.shouldGetStaticPropsForClient) {
        SingletonRoutes.Router.replaceRoute(as);
      }

      return response;
    })
  }
  originalPrototype.getRouteInfo = getRouteInfo;
  originalPrototype.set = newSetMethod;



  const newRoutes = buildRoutes(routes);
  SingletonRoutes.routes = newRoutes.routes;
  SingletonRoutes.Router.routes = SingletonRoutes.routes;
};

export default SingletonRoutes;
