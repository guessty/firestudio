import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import Transition from '../Transition';

export default class Base extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    overlayClassName: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.shape({}),
    render: PropTypes.func,
    returnFocus: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
    className: 'max-w-screen-sm bg-gray-100 p-6 sm:p-12',
    containerClassName: 'p-6 sm:items-center sm:flex-grow',
    overlayClassName: '',
    style: {},
    render: undefined,
    children: null,
    returnFocus: true,
  }

  static getScrollbarWidth() {
    if (typeof document === 'undefined') {
      return 0;
    }

    const scrollDiv = document.createElement('div');
    scrollDiv.style.cssText = `
      width: 100px;
      height: 100px;
      overflow: scroll;
      position: absolute;
      top: -9999px;
    `;
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }

  static toggleBodyLock(isOpen, scrollbarWidth) {
    if (typeof document !== 'undefined') {
      if (document.getElementById('firepressApp')) {
        document.getElementById('firepressApp').style.cssText = isOpen ? `
          overflow: hidden;
          padding-right: ${scrollbarWidth}px !important;
        ` : '';
      }
      document.body.style.cssText = isOpen ? `
        overflow: hidden;
        padding-right: ${scrollbarWidth}px !important;
      ` : '';
    }
  }

  static Overlay = ({ className = '' }) => (
    <div className={`dialog__overlay ${className}`} />
  )

  static Content = ({
    className = '',
    containerClassName = '',
    children = null,
  }) => (
    <div className="dialog__window">
      <div className={`dialog__container ${containerClassName}`}>
        <div className={`dialog__content ${className}`}>
          {children}
        </div>
      </div>
    </div>
  )

  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  state = {
    scrollbarWidth: 0,
    isActive: false,
    enterTransitionCounter: 0,
    exitTransitionCounter: 0,
  }

  componentDidMount() {
    const { returnFocus } = this.props;
    const scrollbarWidth = Base.getScrollbarWidth();

    this.setState({
      scrollbarWidth,
    });

    if (!returnFocus) {
      document.activeElement.focus = undefined;
    }
  }

  componentDidUpdate(prevProps) {
    const { isOpen, returnFocus } = this.props;
    const { scrollbarWidth } = this.state;

    if (isOpen && isOpen !== prevProps.isOpen) {
      Base.toggleBodyLock(true, scrollbarWidth);
      setTimeout(() => {
        this.setState({
          isActive: true,
        });
      }, 0);
    }

    if (!returnFocus) {
      document.activeElement.focus = undefined;
    }
  }

  handleEnter() {
    setTimeout(() => {
      const { enterTransitionCounter } = this.state;
      this.setState({
        enterTransitionCounter: enterTransitionCounter + 1,
      })
    }, 0)
  }

  handleEntered() {
    setTimeout(() => {
      const { enterTransitionCounter } = this.state;
      this.setState({
        enterTransitionCounter: enterTransitionCounter - 1,
      })
    }, 0)
  }

  handleExit() {
    setTimeout(() => {
      const { exitTransitionCounter } = this.state;
      this.setState({
        exitTransitionCounter: exitTransitionCounter + 1,
      })
    }, 0)
  }

  handleExited() {
    setTimeout(() => {
      const { exitTransitionCounter, scrollbarWidth } = this.state;
      const count = exitTransitionCounter - 1
      this.setState({
        exitTransitionCounter: count,
      })
      if (count === 0) {
        Base.toggleBodyLock(false, scrollbarWidth);
        this.setState({
          isActive: false,
        });
      }
    }, 0)
  }

  render() {
    const {
      onDismiss, isOpen, style, render, children,
      className, containerClassName, overlayClassName,
    } = this.props;
    const {
      scrollbarWidth, isActive,
      enterTransitionCounter, exitTransitionCounter,
    } = this.state;

    const transitionCount = enterTransitionCounter + exitTransitionCounter;

    const dialogClassName = classnames(
      'dialog',
      { 'dialog--visible': isOpen || isActive },
    );

    return (
      <DialogOverlay
        isOpen={isOpen || isActive}
        onDismiss={onDismiss}
        className={dialogClassName}
        style={{
          ...style,
          ...transitionCount > 0 ? {
            overflow: 'hidden',
            paddingRight: `${scrollbarWidth}px`,
          } : {
            overflowY: scrollbarWidth > 0 ? 'scroll' : 'auto',
          }
        }}
      >
        <DialogContent>
          {typeof render === 'undefined' ? (
            <>
              <Transition
                in={isOpen && isActive}
                enterTransition={{ fade: true, speed: 'slow' }}
                exitTransition={{ fade: true, speed: 'slow' }}
                onEnter={this.handleEnter}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExited={this.handleExited}
              >
                <Base.Overlay className={overlayClassName} />
              </Transition>
              <Transition
                in={isOpen && isActive}
                enterTransition={{ fade: true, type: 'shift', direction: 'down', speed: 'fast' }}
                exitTransition={{ fade: true, type: 'shift', direction: 'up', speed: 'fast' }}
                onEnter={this.handleEnter}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExited={this.handleExited}
              >
                <Base.Content className={className} containerClassName={containerClassName}>
                  {children}
                </Base.Content>
              </Transition>
            </>
          ) : render({
            Overlay: Base.Overlay,
            Content: Base.Content,
            in: isOpen && isActive,
            onEnter: this.handleEnter,
            onEntered: this.handleEntered,
            onExit: this.handleExit,
            onExited: this.handleExited,
          })}
        </DialogContent>
      </DialogOverlay>
    );
  }
}
