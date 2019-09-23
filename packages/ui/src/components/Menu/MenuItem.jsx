// This file is written to work with react-aria-menubutton.
// It is based on the MenuItem component, but rewritten to assign props directly to a child element.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuItem extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    href: PropTypes.string,
    className: PropTypes.string,
  };

  static contextTypes = {
    ambManager: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    onClick: () => {},
    onKeyDown: () => {},
    href: undefined,
    className: '',
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleKeyDown(event) {
    const { children } = this.props;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    if (children.props.href) return;
    event.preventDefault();
    this.handleSelection(event);
    if (children.props.onKeyDown) {
      children.props.onKeyDown(event);
    }
  }

  handleClick(event) {
    const { children } = this.props;
    this.handleSelection(event);
    if (children.props.onClick) {
      children.props.onClick(event);
    }
  }

  handleSelection(event) {
    const { children } = this.props;
    const { ambManager } = this.context;
    ambManager.handleSelection(children, event);
  }

  render() {
    const { className, children } = this.props;

    const menuItemProps = {
      ...children.props,
      className: `${className} ${children.props.className ? children.props.className : ''}`,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      role: 'menuitem',
    };

    return React.cloneElement(children, menuItemProps);
  }
}
