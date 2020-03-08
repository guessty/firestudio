// This file is written to work with react-aria-menubutton.
// It is based on the Button component, but rewritten to assign props directly to a child element.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuButton extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    disabled: PropTypes.bool,
    'data-menubuttonid': PropTypes.string,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
  };

  static contextTypes = {
    ambManager: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    disabled: false,
    onClick: () => {},
    onKeyDown: () => {},
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { ambManager } = this.context;
    ambManager.button = this;
  }

  componentWillUnmount() {
    const { ambManager } = this.context;
    ambManager.destroy();
  }

  handleKeyDown(event) {
    const { disabled, children: { props: { onKeyDown } } } = this.props;
    const { ambManager } = this.context;

    if (disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!ambManager.isOpen) {
          ambManager.openMenu();
        } else {
          ambManager.focusItem(0);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        ambManager.toggleMenu();
        break;
      case 'Escape':
        ambManager.handleMenuKey(event);
        break;
      default:
        // (Potential) letter keys
        ambManager.handleButtonNonArrowKey(event);
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  }

  handleClick(event) {
    const { disabled, children: { props: { onClick } } } = this.props;
    const { ambManager } = this.context;

    if (disabled) return;

    ambManager.toggleMenu({}, { focusMenu: false });
    
    if (typeof onClick === 'function') {
      onClick(event);
    }
  }

  render() {
    const { disabled, children, 'data-menubuttonid': id } = this.props;
    const { ambManager } = this.context;

    const childProps = {
      ...children.props,
      'aria-haspopup': true,
      'aria-expanded': ambManager.isOpen,
      'aria-disabled': disabled,
      'data-menubuttonid': id,
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
    };

    if (ambManager.options.closeOnBlur) {
      childProps.onBlur = ambManager.handleBlur;
    }

    return React.cloneElement(children, childProps);
  }
}
