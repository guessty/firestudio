import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Menu } from 'react-aria-menubutton';

import MenuButton from './MenuButton';
import MenuHover from './MenuHover';
import MenuList from './MenuList';

export default class _Menu extends PureComponent {
  static propTypes = {
    enableHoverEvents: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    listClassName: PropTypes.string,
    popupClassName: PropTypes.string,
    buttonComponent: PropTypes.element.isRequired,
    children: PropTypes.node,
    render: PropTypes.func,
  };

  static defaultProps = {
    enableHoverEvents: false,
    disabled: false,
    className: '',
    listClassName: '',
    popupClassName: '',
    children: null,
    render: undefined,
  };

  render() {
    const {
      className, popupClassName, containerClassName, listClassName,
      disabled, buttonComponent, enableHoverEvents, children, render,
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
                {typeof render === 'function' ? render({ List: MenuList }) : (
                  <MenuList className={listClassName}>
                    {children}
                  </MenuList>
                )}
              </div>
            ))}
          </Menu>
        </MenuHover>
      </Wrapper>
    );
  }
}
