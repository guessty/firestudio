import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Container extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    children: null,
  }

  render() {
    const { className, children, ...props } = this.props;

    return (
      <div
        className={`container mx-auto max-md:max-w-full ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
}
