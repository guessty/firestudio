import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class MenuHover extends PureComponent {
  static propTypes = {
    enableHoverEvents: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    enableHoverEvents: false,
  };

  static contextTypes = {
    ambManager: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    const { disabled, enableHoverEvents } = this.props;
    const { ambManager } = this.context;

    if (disabled || !enableHoverEvents) return;

    if (enableHoverEvents) {
      if (!ambManager.isOpen) {
        ambManager.openMenu();
      }
    }
  }

  handleMouseLeave() {
    const { disabled, enableHoverEvents } = this.props;
    const { ambManager } = this.context;

    if (disabled || !enableHoverEvents) return;

    if (enableHoverEvents) {
      if (ambManager.isOpen) {
        ambManager.toggleMenu();
        ambManager.handleBlur();
      }
    }
  }

  render() {
    const { children } = this.props;

    return (
      <div
        className="menu__hover"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {children}
      </div>
    );
  }
}
