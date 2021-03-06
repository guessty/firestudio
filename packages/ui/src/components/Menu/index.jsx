import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Menu } from 'react-aria-menubutton';
import shortid from 'shortid';
import domAlign from 'dom-align';

import MenuButton from './MenuButton';
import MenuHover from './MenuHover';
import MenuList from './MenuList';

export default class _Menu extends PureComponent {
  static propTypes = {
    enableHoverEvents: PropTypes.bool,
    keepInDom: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    listClassName: PropTypes.string,
    popupClassName: PropTypes.string,
    buttonComponent: PropTypes.element.isRequired,
    children: PropTypes.node,
    render: PropTypes.func,
    onChange: PropTypes.func,
    position: PropTypes.oneOf([
      'top', 'right', 'bottom', 'left',
      'topRight', 'rightTop', 'topLeft', 'leftTop',
      'bottomRight', 'rightBottom', 'bottomLeft', 'leftBottom',
    ]),
    autoAdjustPosition: PropTypes.bool,
  };

  static defaultProps = {
    enableHoverEvents: false,
    disabled: false,
    keepInDom: false,
    className: '',
    listClassName: '',
    popupClassName: '',
    children: null,
    render: undefined,
    onChange: () => {},
    position: undefined,
    offset: undefined,
    autoAdjustPosition: undefined,
  };

  static getPositionConfig(position, offset = 0, autoAdjust = false) {
    const baseConfig = {
      targetOffset: [0, 0],
      overflow: { adjustX: autoAdjust, adjustY: autoAdjust }
    };

    switch (position) {
      case 'left':
        return { ...baseConfig, points: ['cr', 'cl'], offset: [-offset, 0] };
      case 'right':
        return { ...baseConfig, points: ['cl', 'cr'], offset: [offset, 0] };
      case 'top':
        return { ...baseConfig, points: ['bc', 'tc'], offset: [0, -offset] };
      case 'bottom':
        return { ...baseConfig, points: ['tc', 'bc'], offset: [0, offset] };
      case 'topLeft':
        return { ...baseConfig, points: ['bl', 'tl'], offset: [0, -offset] };
      case 'leftTop':
        return { ...baseConfig, points: ['tr', 'tl'], offset: [-offset, 0] };
      case 'topRight':
        return { ...baseConfig, points: ['br', 'tr'], offset: [0, -offset] };
      case 'rightTop':
        return { ...baseConfig, points: ['tl', 'tr'], offset: [offset, 0] };
      case 'bottomRight':
        return { ...baseConfig, points: ['tr', 'br'], offset: [0, offset] };
      case 'rightBottom':
        return { ...baseConfig, points: ['bl', 'br'], offset: [offset, 0] };
      case 'bottomLeft':
        return { ...baseConfig, points: ['tl', 'bl'], offset: [0, offset] };
      case 'leftBottom':
        return { ...baseConfig, points: ['br', 'bl'], offset: [-offset, 0] };
      default:
        return { ...baseConfig, points: ['tl', 'bl'], offset: [0, offset] };
    }
  }

  state = {
    buttonId: shortid.generate(),
    popupId: shortid.generate(),
  };

  componentDidMount() {
    this.handleAlignMenu();
  }

  handleAlignMenu = () => {
    const { position, offset, autoAdjustPosition } = this.props;
    const { buttonId, popupId } = this.state;

    if (typeof window !== 'undefined' && typeof position !== 'undefined') {
      const buttonElement = document.querySelector(`[data-menubuttonid="${buttonId}"]`);
      const menuElement = document.querySelector(`[data-menupopupid="${popupId}"]`);
  
      if (buttonElement && menuElement) {
        setTimeout(() => {
          domAlign(
            menuElement,
            buttonElement,
            _Menu.getPositionConfig(position, offset, autoAdjustPosition),
          );
        }, 0);
      }
    }
  };

  renderMenu(isOpen) {
    const {
      keepInDom, containerClassName, listClassName, render, children,
    } = this.props;

    if (keepInDom) {
      const className = `
        menu__container ${containerClassName}
        ${isOpen ? 'menu__container--open'
          : 'menu__container--closed'}
      `;

      return (
        <div
          aria-hidden={!isOpen}
          className={className}
        >
          {typeof render === 'function' ? render({ List: MenuList, isOpen }) : (
            <MenuList className={listClassName}>
              {children}
            </MenuList>
          )}
        </div>
      );
    }

    return isOpen ? (
      <div className={`menu__container ${containerClassName}`}>
        {typeof render === 'function' ? render({ List: MenuList, isOpen }) : (
          <MenuList className={listClassName}>
            {children}
          </MenuList>
        )}
      </div>
    ) : false;
  }

  render() {
    const {
      className, popupClassName, disabled,
      buttonComponent, enableHoverEvents, onChange,
    } = this.props;
    const { buttonId, popupId } = this.state;

    return (
      <Wrapper
        className={`menu ${className}`}
      >
        <MenuHover enableHoverEvents={enableHoverEvents}>
          <MenuButton
            className="menu__button"
            data-menubuttonid={buttonId}
            disabled={disabled}
          >
            {buttonComponent}
          </MenuButton>
          <Menu
            className={`menu__popup ${popupClassName}`}
            data-menupopupid={popupId}
          >
            {menuState => {
              onChange(menuState);
              this.handleAlignMenu();

              return this.renderMenu(menuState.isOpen)
            }}
          </Menu>
        </MenuHover>
      </Wrapper>
    );
  }
}
