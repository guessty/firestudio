import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import MenuItem from './MenuItem';

export default class MenuList extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { children, className } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return (
      <ul
        className={`menu__list ${className}`}
        role="none"
      >
        {childArray.map((child, i) => {
          const key = `menu-item-${i}`;

          return (
            <li key={key} role="none">
              <MenuItem className="menu__item">
                {child}
              </MenuItem>
            </li>
          );
        })}
      </ul>
    );
  }
}