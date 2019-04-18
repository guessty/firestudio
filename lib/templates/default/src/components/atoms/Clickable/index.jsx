import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

require('./Clickable.scss');

export default class Clickable extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    as: PropTypes.oneOfType([
      PropTypes.oneOf(['a', 'button']),
      PropTypes.func,
    ]),
    styledAs: PropTypes.oneOf(['a', 'button', 'none']),
    isFlat: PropTypes.bool,
  }

  static defaultProps = {
    className: '',
    as: 'button',
    styledAs: undefined,
    isFlat: false,
  }

  getClassName() {
    const {
      as, styledAs, className, isFlat,
    } = this.props;

    return classnames(
      'Clickable',
      { 'Clickable--button': styledAs === 'button' || (typeof styledAs === 'undefined' && as === 'button') },
      { 'Clickable--link': styledAs === 'a' || (typeof styledAs === 'undefined' && as === 'a') },
      { 'Clickable--is-flat': isFlat },
      [className],
    );
  }

  renderButton() {
    const {
      as, styledAs, children, isFlat,
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
      isFlat, ...props
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
