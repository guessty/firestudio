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
      speed: PropTypes.oneOf(['slow', 'normal', 'fast', 'instant']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['out', 'outBack'])
    }),
    exitTransition: PropTypes.shape({
      fade: PropTypes.bool,
      absolute: PropTypes.bool,
      type: PropTypes.oneOf(['shift', 'slide']),
      direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
      speed: PropTypes.oneOf(['instant', 'slow', 'normal', 'fast']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['out', 'outBack'])
    }),
    in: PropTypes.bool,
    appear: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    mountOnEnter: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    enterTransition: {
      fade: true,
      absolute: false,
      type: undefined,
      direction: undefined,
      speed: 'normal',
      delay: 'none',
      easing: 'out',
    },
    exitTransition: undefined,
    in: true,
    appear: true,
    mountOnEnter: false,
    unmountOnExit: true,
    onEnter: () => {},
    onEntered: () => {},
    onExit: () => {},
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
    const { fade, absolute, type, direction, speed, easing, delay } = transition;

    const transType = direction && !type ? 'shift' : type;
    const transDirection = type && !direction ? 'down' : direction;
    const transSpeed = speed || 'normal';
    const transDelay = delay || 'none';
    const transEasing = easing || 'out';

    return classnames(
      'transition',
      {
        [`transition--fade-${stage}`] : fade,
        [`transition--no-fade-${stage}`] : !fade,
        [`transition--absolute-${stage}`] : absolute,
        [`transition--${transType}-${transDirection}-${stage}`] : Boolean(transType) && Boolean(transDirection),
      },
      [`transition-speed--${transSpeed}`],
      [`transition-delay--${transDelay}`],
      [`transition-easing--${transEasing}`],
    )
  }

  render() {
    const {
      in: isIn, appear, unmountOnExit, update,
      onEnter, onEntered, onExit, onExited, children,
    } = this.props;

    return (
      <CSSTransition
        in={isIn}
        appear={appear}
        unmountOnExit={unmountOnExit}
        addEndListener={(node, done) => {
          node.addEventListener('transitionend', done, false);
        }}
        classNames={{
          enter: this.getStageClassName('enter'),
          enterActive: this.getStageClassName('enter-active'),
          enterDone: this.getStageClassName('enter-done'),
          exit: this.getStageClassName('exit'),
          exitActive: this.getStageClassName('exit-active'),
          exitDone: this.getStageClassName('exit-done'),
        }}
        onEnter={onEnter}
        onEntered={onEntered}
        onExit={onExit}
        onExited={onExited}
      >
        {children}
      </CSSTransition>
    );
  }
}
