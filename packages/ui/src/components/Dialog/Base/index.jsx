import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DialogOverlay, DialogContent } from '@reach/dialog';

import Transition from '../../Transition';

export default class Base extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onDismiss: PropTypes.func,
    className: PropTypes.string,
    overlayClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
    ]).isRequired,
    style: PropTypes.shape({}),
    unmountingDelay: PropTypes.number,
    render: PropTypes.func,
  }

  static defaultProps = {
    isOpen: false,
    onDismiss: () => {},
    className: '',
    overlayClassName: '',
    contentClassName: '',
    style: {},
    unmountingDelay: 0,
    render: undefined,
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
        margin-right: ${scrollbarWidth}px;
        overflow: hidden;
        height: 100vh;
      ` : '';
    }
  }

  static Overlay = ({ overlayClassName }) => (
    <div className={`dialog__overlay ${overlayClassName}`} />
  )

  static Content = ({
    className,
    contentClassName,
    children,
  }) => (
    <div className="dialog__body">
      <div className={`dialog__main ${className}`}>
        <div className={`dialog__content ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  )

  static getDerivedStateFromProps(props) {
    const { render, unmountingDelay } = props;

    return {
      unmountingDelay: typeof render === 'undefined' ? 350 : unmountingDelay,
    }
  }

  state = {
    scrollbarWidth: 0,
    unmountingDelay: 0,
    isTransitioning: false,
  }

  componentDidMount() {
    const scrollbarWidth = Base.getScrollbarWidth();

    this.setState({
      scrollbarWidth,
    });
  }

  componentDidUpdate(prevProps) {
    const { isOpen } = this.props;
    const { scrollbarWidth, isTransitioning, unmountingDelay } = this.state;

    if (isOpen !== prevProps.isOpen) {
      Base.toggleBodyLock(isOpen, scrollbarWidth);
    }

    if (isOpen !== prevProps.isOpen && isTransitioning !== isOpen) {
      setTimeout(() => {
        this.setState({
          isTransitioning: isOpen,
        });
      }, isOpen ? 0 : unmountingDelay);
    }
  }

  async componentWillUnmount() {
    const { isOpen } = this.props;
    const { scrollbarWidth, unmountingDelay } = this.state;

    await Base.sleep(unmountingDelay);

    if (isOpen) {
      Base.toggleBodyLock(false, scrollbarWidth);
    }
  }

  render() {
    const {
      onDismiss, isOpen, style, render, children,
      className, contentClassName, overlayClassName,
    } = this.props;
    const { scrollbarWidth, isTransitioning } = this.state;

    const dialogClassName = classnames(
      'dialog',
      { 'dialog--visible': isOpen || isTransitioning },
    );

    return (
      <DialogOverlay
        isOpen={isOpen || isTransitioning}
        onDismiss={onDismiss}
        className={dialogClassName}
        style={{
          ...style,
          overflowY: scrollbarWidth > 0 ? 'scroll' : 'auto',
        }}
      >

        <DialogContent className="dialog__window">
          {typeof render === 'undefined' ? (
            <>
              <Transition
                isIn={isOpen && isTransitioning}
                in={{ fade: true, speed: 'slow' }}
                out={{ fade: true, speed: 'slow' }}
              >
                <Base.Overlay overlayClassName={overlayClassName} />
              </Transition>
              <Transition
                isIn={isOpen && isTransitioning}
                in={{ fade: true, type: 'shift', direction: 'down', speed: 'fast' }}
                out={{ fade: true, type: 'shift', direction: 'up', speed: 'fast' }}
              >
                <Base.Content className={className} contentClassName={contentClassName}>
                  {children}
                </Base.Content>
              </Transition>
            </>
          ) : render({
            Overlay: Base.Overlay,
            Content: Base.Content,
            isOpen: isOpen && isTransitioning,
          })}
        </DialogContent>
      </DialogOverlay>
    );
  }
}
