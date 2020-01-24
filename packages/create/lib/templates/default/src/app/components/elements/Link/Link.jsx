import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FirepressLink from '@firepress/core/link';
import { Clickable } from '@firepress/ui';

export default class Link extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
  };

  render() {
    const { href, ...props } = this.props;

    return href.charAt(0) === '/' ? (
      <FirepressLink to={href}>
        <Clickable
          {...props}
          href={href}
          as="a"
        />
      </FirepressLink>
    ) : (
      <Clickable
        {...props}
        href={href}
        as="a"
      />
    );
  }
}
