import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Menu } from 'react-aria-menubutton';

import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import MenuHover from './MenuHover';

export default class _Menu extends PureComponent {
  static propTypes = {
    enableHoverEvents: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    listClassName: PropTypes.string,
    popupClassName: PropTypes.string,
    buttonComponent: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    enableHoverEvents: false,
    disabled: false,
    className: '',
    listClassName: '',
    popupClassName: '',
    render: undefined,
  };

  static ItemList = ({ children, className }) => {
    const childArray = Array.isArray(children) ? children : [children];

    return (
      <ul
        className={`menu__list ${className}`}
        role="none"
        style={style}
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

  renderChildren() {
    const { children } = this.props;
    const childArray = Array.isArray(children) ? children : [children];

    return childArray.map((child, i) => {
      const key = `menu-item-${i}`;

      return (
        <li key={key} role="none">
          <MenuItem className="menu__item">
            {child}
          </MenuItem>
        </li>
      );
    });
  }

  render() {
    const {
      className, popupClassName, containerClassName, listClassName,
      disabled, buttonComponent, enableHoverEvents, render,
    } = this.props;

    return (
      <Wrapper
        className={`menu ${className}`}
      >
        <MenuHover enableHoverEvents={enableHoverEvents}>
          <MenuButton
            className="menu__button"
            disabled={disabled}
          >
            {buttonComponent}
          </MenuButton>
          <Menu
            className={`menu__popup ${popupClassName}`}
          >
            {menuState => ((!menuState.isOpen) ? false : (
              <div className={`relative ${containerClassName}`}>
                {typeof render === 'function' ? render({ ItemList }) : (
                  <ItemList className={listClassName} children={children} />
                )}
              </div>
            ))}
          </Menu>
        </MenuHover>
      </Wrapper>
    );
  }
}
