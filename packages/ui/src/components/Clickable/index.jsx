import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Link from '@firepress/core/link';

export default class Clickable extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    as: PropTypes.oneOfType([
      PropTypes.oneOf(['a', 'button']),
    ]),
    styledAs: PropTypes.oneOf(['a', 'button', 'none']),
    isRaised: PropTypes.bool,
    isExternal: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
    replace: PropTypes.bool,
    scroll: PropTypes.bool,
    prefetch: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    as: 'button',
    styledAs: undefined,
    isRaised: false,
    isExternal: false,
    href: '',
    target: undefined,
    rel: undefined,
    replace: false,
    scroll: false,
    prefetch: false,
  }

  getClassName() {
    const {
      as, styledAs, className, isRaised,
    } = this.props;

    const isUndefined = typeof styledAs === 'undefined';

    return classnames(
      'clickable',
      styledAs !== 'none' ? {
        'clickable--button': styledAs === 'button' || ( isUndefined && as === 'button'),
        'clickable--link': styledAs === 'a' || ( isUndefined && as === 'a'),
      } : {},
      { 'clickable--is-raised': isRaised },
      [className],
    );
  }

  renderLink() {
    const {
      as, styledAs, children, isRaised, isExternal,
      prefetch, replace, scroll,
      href, target, rel,
      ...props
    } = this.props;

    const className = this.getClassName();

    const linkRel = target === '_blank' ? 'noopener noreferrer' : rel;

    const linkJSX = (
      <a
        {...props}
        href={href}
        target={target}
        rel={linkRel}
        className={className}
      >
        {children}
      </a>
    );

    return !isExternal ? (
      <Link
        to={href}
        prefetch={prefetch}
        scroll={scroll}
        replace={replace}
      >
        {linkJSX}
      </Link>
    ) : linkJSX;
  }

  renderButton() {
    const {
      as, styledAs, children, isRaised, isExternal,
      prefetch, replace, scroll,
      href, target, rel,
      ...props
    } = this.props;

    const className = this.getClassName();

    return (
      <button type="button" {...props} className={className}>
        {children}
      </button>
    );
  }

  render() {
    const { as: renderAs } = this.props;

    switch (renderAs) {
      case 'a':
        return this.renderLink();
      case 'button':
        return this.renderButton();
      default:
        return this.renderButton();
    }
  }
}
