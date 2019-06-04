import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dialog, { DialogOverlay, DialogContent } from '@reach/dialog';

import Transition from '../../Transition';

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
  }

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
    className: '',
    containerClassName: '',
    overlayClassName: '',
    style: {},
    render: undefined,
    children: null,
  }

  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
      document.body.style.cssText = isOpen ? `
        overflow: hidden;
        height: 100vh;
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
    transitionCounter: 0,
  }

  componentDidMount() {
    const scrollbarWidth = Base.getScrollbarWidth();

    this.setState({
      scrollbarWidth,
    });
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    const { scrollbarWidth } = this.state;

    if (isOpen && isOpen !== prevProps.isOpen) {
      Base.toggleBodyLock(true, scrollbarWidth);
      setTimeout(() => {
        this.setState({
          isActive: true,
        });
      }, 0);
    }
  }

  handleEnter() {
    setTimeout(() => {
      const { transitionCounter } = this.state;
      this.setState({
        transitionCounter: transitionCounter + 1,
      })
    }, 0);
  }

  handleEntered() {
    setTimeout(() => {
      const { transitionCounter } = this.state;
      this.setState({
        transitionCounter: transitionCounter - 1,
      })
    }, 0);
  }

  handleExit() {
    setTimeout(() => {
      const { transitionCounter } = this.state;
      this.setState({
        transitionCounter: transitionCounter + 1,
      })
    }, 0);
  }

  handleExited() {
    const { scrollbarWidth } = this.state;

    Base.toggleBodyLock(false, scrollbarWidth);

    setTimeout(() => {
      const { transitionCounter } = this.state;
      const count = transitionCounter - 1;
      this.setState({
        transitionCounter: count,
      });
      if (count === 0) {
        this.setState({
          isActive: false,
        });
      }
    }, 0);
  }

  render() {
    const {
      onDismiss, isOpen, style, render, children,
      className, containerClassName, overlayClassName,
    } = this.props;
    const { scrollbarWidth, isActive, transitionCounter } = this.state;

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
          ...transitionCounter > 0 ? {
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
                isIn={isOpen && isActive}
                in={{ fade: true, speed: 'slow' }}
                out={{ fade: true, speed: 'slow' }}
                onEnter={this.handleEnter}
                onEntered={this.handleEntered}
                onExit={this.handleExit}
                onExited={this.handleExited}
              >
                <Base.Overlay className={overlayClassName} />
              </Transition>
              <Transition
                isIn={isOpen && isActive}
                in={{ fade: true, type: 'shift', direction: 'down', speed: 'fast' }}
                out={{ fade: true, type: 'shift', direction: 'up', speed: 'fast' }}
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
            isIn: isOpen && isActive,
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
