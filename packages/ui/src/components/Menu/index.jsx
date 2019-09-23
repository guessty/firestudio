import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Menu } from 'react-aria-menubutton';
import classnames from 'classnames';

import MenuButton from './MenuButton';
import MenuItem from './MenuItem';
import MenuHover from './MenuHover';

export default class _Menu extends PureComponent {
  static propTypes = {
    alignRight: PropTypes.bool,
    enableHoverEvents: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    listClassName: PropTypes.string,
    popupClassName: PropTypes.string,
    style: PropTypes.shape({}),
    buttonComponent: PropTypes.element.isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    alignRight: false,
    enableHoverEvents: false,
    disabled: false,
    className: '',
    listClassName: '',
    popupClassName: '',
    style: {},
  };

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
      className, listClassName, popupClassName, disabled,
      style, buttonComponent, alignRight, enableHoverEvents,
    } = this.props;

    const menuClassName = classnames(
      'menu__popup',
      { 'menu__popup--align-right': alignRight },
      'pt-1 -mt-1',
    );

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
            className={menuClassName}
          >
            {menuState => ((!menuState.isOpen) ? false : (
              <div className={`relative ${popupClassName}`}>
                <ul
                  className={`menu__list ${listClassName}`}
                  role="none"
                  style={style}
                >
                  {this.renderChildren()}
                </ul>
              </div>
            ))}
          </Menu>
        </MenuHover>
      </Wrapper>
    );
  }
}
