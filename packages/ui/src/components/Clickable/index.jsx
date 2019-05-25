import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Clickable extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    as: PropTypes.oneOfType([
      PropTypes.oneOf(['a', 'button']),
      PropTypes.func,
    ]),
    styledAs: PropTypes.oneOf(['a', 'button', 'none']),
    isRaised: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    as: 'button',
    styledAs: undefined,
    isRaised: false,
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

  renderButton() {
    const {
      as, styledAs, children, isRaised,
      ...props
    } = this.props;

    const className = this.getClassName();

    switch (as) {
      case ('a'):
        return (
          <a {...props} className={className}>
            {children}
          </a>
        );
      default:
        return (
          <button type="button" {...props} className={className}>
            {children}
          </button>
        );
    }
  }

  render() {
    const {
      as: Component, styledAs, children,
      isRaised, ...props
    } = this.props;

    const className = this.getClassName();

    if (typeof Component === 'string') {
      return this.renderButton();
    }

    return (
      <Component {...props} className={className}>
        {children}
      </Component>
    );
  }
}
