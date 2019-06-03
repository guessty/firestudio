import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import Transition from '../../Transition';

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    headComponent: PropTypes.node,
    initialFocusRef: PropTypes.shape({}),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    transitionProps: PropTypes.shape({
      in: PropTypes.shape({}),
      out: PropTypes.shape({}),
      update: PropTypes.string,
    }),
    overlayTransitionProps: PropTypes.shape({
      in: PropTypes.shape({}),
      out: PropTypes.shape({}),
    }),
    style: PropTypes.shape({}),
  }

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
    className: '',
    overlayClassName: '',
    contentClassName: '',
    headComponent: null,
    initialFocusRef: undefined,
    transitionProps: {
      in: Transition.defaultProps.in,
      out: Transition.defaultProps.in,
      update: { fade: true },
    },
    overlayTransitionProps: {
      in: { fade: true, speed: 'slow' },
      out: { fade: true, speed: 'slow' },
    },
    style: {},
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
        margin-right: ${scrollbarWidth}px;
        overflow: hidden;
        height: 100vh;
      ` : '';
    }
  }

  contentRef = React.createRef();

  state = {
    scrollbarWidth: 0,
    isMounted: false,
  }

  componentDidMount() {
    const scrollbarWidth = Modal.getScrollbarWidth();
    console.log('Modal mounted')

    this.setState({
      scrollbarWidth,
    });
  }

  componentDidUpdate(prevProps) {
    const { isOpen, initialFocusRef, transitionProps, overlayTransitionProps } = this.props;
    const { scrollbarWidth, isMounted } = this.state;

    if (prevProps.isOpen !== isOpen) {
      Modal.toggleBodyLock(isOpen, scrollbarWidth);
    }

    const modalTimeout = Transition.getTimeout(transitionProps.out);
    const overlayTimout = Transition.getTimeout(overlayTransitionProps.out);

    const unmountingDelay = Math.max(modalTimeout, overlayTimout);

    if (isOpen !== prevProps.isOpen && isMounted !== isOpen) {
      setTimeout(() => {
        this.setState({
          isMounted: isOpen,
        });

        const initFocus = initialFocusRef || this.contentRef;
        if (initFocus.current) {
          initFocus.current.focus();
        }
      }, isOpen ? 0 : unmountingDelay);
    }
  }

  componentWillUnmount() {
    const { isOpen } = this.props;
    const { scrollbarWidth } = this.state;

    if (isOpen) {
      Modal.toggleBodyLock(false, scrollbarWidth);
    }
  }

  renderHead() {
    const { headComponent } = this.props;

    return headComponent && (
      <div className="modal__head" aria-hidden tabIndex="-1">
        {headComponent}
      </div>
    );
  }

  renderBody() {
    const {
      isOpen, transitionProps, children,
      className, contentClassName,
    } = this.props;

    const { isMounted } = this.state;

    return (
      <Transition
        {...Modal.defaultProps.transitionProps}
        {...transitionProps}
        isMounted={isOpen && isMounted}
      >
        <div className="modal__body">
          <div className={`modal__main ${className}`}>
            <div className={`modal__content ${contentClassName}`} tabIndex="-1" ref={this.contentRef}>
              {children}
            </div>
          </div>
        </div>
      </Transition>
    );
  }

  renderOverlay() {
    const { overlayClassName, overlayTransitionProps, isOpen } = this.props;
    const { isMounted } = this.state;

    return (
      <Transition
        {...Modal.defaultProps.overlayTransitionProps}
        {...overlayTransitionProps}
        isMounted={isOpen && isMounted}
      >
        <div className={`modal__overlay ${overlayClassName}`} />
      </Transition>
    );
  }

  render() {
    const {
      onDismiss, isOpen, style,
    } = this.props;
    const { scrollbarWidth, isMounted } = this.state;

    const modalClassName = classnames(
      'modal',
      { 'modal--visible': isOpen || isMounted },
    );

    return (
      <DialogOverlay
        isOpen={isOpen || isMounted}
        onDismiss={onDismiss}
        className={modalClassName}
        style={{
          ...style,
          overflowY: scrollbarWidth > 0 ? 'scroll' : 'auto',
        }}
      >
        {this.renderOverlay()}
        <DialogContent className="modal__window">
          {this.renderHead()}
          {this.renderBody()}
        </DialogContent>
      </DialogOverlay>
    );
  }
}
