import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import parseUrl from 'url-parse';

import { default as Routes } from './routes';

export default class Link extends PureComponent {
  static propTypes = {
    to: PropTypes.string.isRequired,
  };

  state = {
    routes: Routes.routes,
  };

  componentDidMount() {
    Routes.Router.router?.events.on('routesSet', this.handleRoutesSet);
  }

  componentWillUnmount() {
    Routes.Router.router?.events.off('routesSet', this.handleRoutesSet)
  }

  handleRoutesSet = (routes) => {
    this.setState({ routes });
  }

  match(url) {
    const { routes } = this.state;
    const parsedUrl = parseUrl(url, true);
    const { pathname, query } = parsedUrl;

    return routes.reduce((result, route) => {
      if (result.route) return result;
      const params = route.match(pathname);
      if (!params) return result;

      return {
        ...result, route, params, query: { ...query, ...params },
      };
    }, { query, parsedUrl });
  }

  findAndGetUrls(url) {
    const { route: matchedRoute, query } = this.match(url);
    const href = matchedRoute ? matchedRoute.getHref(query) : url;

    return { href, as: url };
  }

  render() {
    const { to, ...props } = this.props;
  
    Object.assign(props, this.findAndGetUrls(to));

    return (
      <NextLink {...props} />
    );
  }
}