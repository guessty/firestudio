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
    headComponent: PropTypes.node,
    initialFocusRef: PropTypes.shape({}),
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    transitionProps: PropTypes.shape({
      in: PropTypes.string,
      out: PropTypes.string,
      update: PropTypes.string,
    }),
    style: PropTypes.shape({}),
  }

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
    className: '',
    headComponent: null,
    initialFocusRef: undefined,
    transitionProps: {
      in: Transition.TRANSITIONS.FADE,
      out: Transition.TRANSITIONS.FADE,
      update: Transition.TRANSITIONS.FADE,
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

  bodyRef = React.createRef();

  state = {
    scrollbarWidth: 0,
    isMounted: false,
  }

  componentDidMount() {
    this.setState({
      scrollbarWidth: Modal.getScrollbarWidth(),
    });
  }

  componentDidUpdate(prevProps) {
    const { isOpen, initialFocusRef, transitionProps } = this.props;
    const { scrollbarWidth, isMounted } = this.state;

    if (prevProps.isOpen !== isOpen) {
      Modal.toggleBodyLock(isOpen, scrollbarWidth);
    }

    const unmountingDelay = transitionProps.out === Transition.TRANSITIONS.NONE ? 0 : 150;

    if (isOpen !== prevProps.isOpen && isMounted !== isOpen) {
      setTimeout(() => {
        this.setState({
          isMounted: isOpen,
        });

        const initFocus = initialFocusRef || this.bodyRef;
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
    const { isOpen, transitionProps, children } = this.props;

    const { isMounted } = this.state;

    return (
      <Transition
        {...Modal.defaultProps.transitionProps}
        {...transitionProps}
        isMounted={isOpen && isMounted}
      >
        <div className="modal__body" tabIndex="-1" ref={this.bodyRef}>
          {children}
        </div>
      </Transition>
    );
  }

  renderOverlay() {
    const { transitionProps, isOpen } = this.props;
    const { isMounted } = this.state;

    return (
      <Transition
        in={Transition.TRANSITIONS.FADE}
        out={transitionProps.out === Transition.TRANSITIONS.NONE
          ? Transition.TRANSITIONS.NONE : Transition.TRANSITIONS.FADE}
        isMounted={isOpen && isMounted}
      >
        <div className="modal__overlay" />
      </Transition>
    );
  }

  render() {
    const {
      onDismiss, isOpen, className, style,
    } = this.props;
    const { scrollbarWidth, isMounted } = this.state;

    const modalClassName = classnames(
      'modal',
      { 'modal--visible': isOpen || isMounted },
      [className],
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
        <DialogContent className="modal__content">
          {this.renderHead()}
          {this.renderBody()}
        </DialogContent>
      </DialogOverlay>
    );
  }
}
