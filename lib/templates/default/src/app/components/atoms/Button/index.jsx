import React from 'react';
//
import Link from '@atoms/Link';
//
require('./Button.scss');
//

export default class Button extends React.PureComponent {
  static defaultProps = {
    to: undefined,
    disabled: false,
    className: '',
    onClick: () => {},
  }

  render() {
    const {
      to, className, disabled, children, onClick,
    } = this.props;

    const buttonClassNames = `Button ${disabled && 'Button--disabled'} ${className}`;

    return to ? (
      <Link
        to={to}
        className={buttonClassNames}
        onClick={disabled ? e => e.preventDefault() : onClick}
      >
        {children}
      </Link>
    ) : (
      <button
        className={buttonClassNames}
        type="button"
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
}
