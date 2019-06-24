import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import classnames from 'classnames';

export default class Transition extends Component {
  static propTypes = {
    enterTransition: PropTypes.shape({
      fade: PropTypes.bool,
      absolute: PropTypes.bool,
      type: PropTypes.oneOf(['shift', 'slide']),
      direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
      custom: PropTypes.string,
      speed: PropTypes.oneOf(['slow', 'normal', 'fast', 'instant']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['out', 'outBack']),
      timeout: PropTypes.number,
    }),
    exitTransition: PropTypes.shape({
      fade: PropTypes.bool,
      absolute: PropTypes.bool,
      type: PropTypes.oneOf(['shift', 'slide']),
      direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
      custom: PropTypes.string,
      speed: PropTypes.oneOf(['instant', 'slow', 'normal', 'fast']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['ease', 'ease-out', 'ease-out-back']),
      timeout: PropTypes.number,
    }),
    in: PropTypes.bool,
    appear: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntering: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExiting: PropTypes.func,
    onExited: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    enterTransition: {
      fade: true,
      absolute: false,
      type: undefined,
      direction: undefined,
      custom: undefined,
      speed: 'normal',
      delay: 'none',
      easing: 'ease',
      timeout: 0,
    },
    exitTransition: undefined,
    in: true,
    appear: false,
    mountOnEnter: false,
    unmountOnExit: true,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExiting: () => {},
    onExited: () => {},
    children: undefined,
  }

  static Group = TransitionGroup

  static Page = TransitionGroup

  getStageClassName(stage) {
    const {
      in: isIn, enterTransition, exitTransition,
    } = this.props;

    const transition = isIn ? enterTransition : (exitTransition || enterTransition);
    const { fade, absolute, type, direction, custom, speed, easing, delay } = transition;

    const transType = direction && !type ? 'shift' : type;
    const transDirection = type && !direction ? 'down' : direction;
    const transSpeed = speed || 'normal';
    const transDelay = delay || 'none';
    const transEasing = easing || 'ease';

    return classnames(
      'transition',
      {
        [`transition--fade-${stage}`] : fade,
        [`transition--no-fade-${stage}`] : !fade,
        [`transition--absolute-${stage}`] : absolute,
        [`transition--${transType}-${transDirection}-${stage}`] : !Boolean(custom) && Boolean(transType) && Boolean(transDirection),
        [`transition--${custom}-${stage}`]: Boolean(custom),
      },
      [`transition-speed--${transSpeed}`],
      [`transition-delay--${transDelay}`],
      [`transition-easing--${transEasing}`],
    )
  }

  render() {
    const {
      in: isIn, appear, children,
      mountOnEnter, unmountOnExit,
      enterTransition, exitTransition,
      onEnter, onEntering, onEntered,
      onExit, onExiting, onExited,
    } = this.props;

    const transition = isIn ? enterTransition : (exitTransition || enterTransition);

    return (
      <CSSTransition
        in={isIn}
        appear={appear}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        timeout={transition.timeout || 600}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames={{
          appear: this.getStageClassName('enter'),
          appearActive: this.getStageClassName('enter-active'),
          appearDone: this.getStageClassName('enter-done'),
          enter: this.getStageClassName('enter'),
          enterActive: this.getStageClassName('enter-active'),
          enterDone: this.getStageClassName('enter-done'),
          exit: this.getStageClassName('exit'),
          exitActive: this.getStageClassName('exit-active'),
          exitDone: this.getStageClassName('exit-done'),
        }}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
      >
        {children}
      </CSSTransition>
    );
  }
}
