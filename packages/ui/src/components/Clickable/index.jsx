import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Clickable extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    as: PropTypes.oneOfType([
      PropTypes.oneOf(['a', 'button']),
    ]),
    styledAs: PropTypes.oneOf(['a', 'button', 'none']),
    isRaised: PropTypes.bool,
    href: PropTypes.string,
    target: PropTypes.string,
    rel: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    as: 'button',
    styledAs: undefined,
    isRaised: false,
    href: '',
    target: undefined,
    rel: undefined,
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
      as, styledAs, children, isRaised,
      href, target, rel,
      ...props
    } = this.props;

    const className = this.getClassName();

    const linkRel = target === '_blank' ? 'noopener noreferrer' : rel;

    return (
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
  }

  renderButton() {
    const {
      as, styledAs, children, isRaised,
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
