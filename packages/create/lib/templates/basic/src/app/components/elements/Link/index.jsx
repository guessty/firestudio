import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';

export default class Link extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    asNextLink: PropTypes.bool,
    isExternal: PropTypes.bool,
    prefetch: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
  }

  static defaultProps = {
    className: '',
    asNextLink: false,
    isExternal: false,
    prefetch: false,
    onClick: () => {},
  }

  handleClick = (e) => {
    const { modal, onClick } = this.props;
    modal.closeAll();
    onClick(e);
  }

  render() {
    const {
      href, asNextLink, isExternal, prefetch, className,
      children, onClick, ...linkProps
    } = this.props;

    const linkJSX = (
      <a
        href={href}
        className={className}
        onClick={onClick}
        {...linkProps}
      >
        {children}
      </a>
    );

    return asNextLink ? (
      <NextLink href={href} as={href} prefetch={prefetch}>
        {linkJSX}
      </NextLink>
    ) : linkJSX;
  }
}
