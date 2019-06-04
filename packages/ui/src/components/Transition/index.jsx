import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';
import { configOptions } from 'final-form';

export default class Transition extends Component {
  static propTypes = {
    in: PropTypes.shape({
      fade: PropTypes.bool,
      type: PropTypes.oneOf(['shift', 'slide']),
      direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
      speed: PropTypes.oneOf(['slow', 'normal', 'fast', 'instant']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['out', 'outBack'])
    }),
    out: PropTypes.shape({
      fade: PropTypes.bool,
      type: PropTypes.oneOf(['shift', 'slide']),
      direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
      speed: PropTypes.oneOf(['instant', 'slow', 'normal', 'fast']),
      delay: PropTypes.oneOf(['none', 'short', 'medium', 'long']),
      easing: PropTypes.oneOf(['out', 'outBack'])
    }),
    update: PropTypes.string,
    isIn: PropTypes.bool,
    enterOnMount: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    onEnter: PropTypes.func,
    onEntered: PropTypes.func,
    onExit: PropTypes.func,
    onExited: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    in: {
      fade: true,
      type: undefined,
      direction: undefined,
      speed: 'normal',
      delay: 'none',
      easing: 'out',
    },
    out: undefined,
    update: 'fade',
    isIn: true,
    enterOnMount: true,
    unmountOnExit: true,
    onEnter: () => {},
    onEntered: () => {},
    onExit: () => {},
    onExited: () => {},
    children: undefined,
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isEntered && props.children.key
    && props.children.key !== state.activeChild.key) {
      return {
        nextChild: props.children,
      };
    }

    return {
      nextChild: props.children,
      activeChild: props.children,
    };
  }

  state = {
    isUpdating: false,
    // eslint-disable-next-line react/destructuring-assignment
    activeChild: this.props.children,
    nextChild: undefined,
  }

  constructor(props) {
    super(props);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  componentDidUpdate() {
    const { isUpdating, activeChild, nextChild } = this.state;
    const { isIn } = this.props;

    if (isIn && !isUpdating && nextChild.key !== activeChild.key) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isUpdating: true,
      });
      setTimeout(() => {
        this.setState({
          activeChild: nextChild,
        });
      }, 100);
      setTimeout(() => {
        this.setState({
          isUpdating: false,
        });
      }, 200);
    }
  }

  getStageClassName(stage) {
    const {
      isIn, in: inTransition, out,
    } = this.props;
    const outTransition = out || inTransition;
    const transition = isIn ? inTransition : outTransition;

    const { fade, type, direction, speed, easing, delay } = transition;

    const transType = direction && !type ? 'shift' : type;
    const transDirection = type && !direction ? 'down' : direction;
    const transSpeed = speed || 'normal';
    const transDelay = delay || 'none';
    const transEasing = easing || 'out';

    return classnames(
      'transition',
      {
        [`transition--fade-${stage}`] : fade,
        [`transition--${transType}-${transDirection}-${stage}`] : Boolean(transType) && Boolean(transDirection),
      },
      [`transition--${transSpeed}`],
      [`transition--${transDelay}`],
      [`transition--${transEasing}`],
    )
  }

  handleEntered(node) {
    const { onEntered } = this.props;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isEntered: true,
    });
    onEntered(node);
  }

  handleExited(node) {
    const { onExited } = this.props;
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isEntered: false,
    });
    onExited(node);
  }

  render() {
    const {
      isIn, enterOnMount, unmountOnExit, update,
      onEnter, onExit,
    } = this.props;
    const { isUpdating, activeChild } = this.state;

    return (
      <CSSTransition
        in={isIn}
        appear={enterOnMount}
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
        onEntered={this.handleEntered}
        onExit={onExit}
        onExited={this.handleExited}
        unmountOnExit={unmountOnExit}
      >
        {isUpdating ? (
          <div className={`transition--update-${update}`}>
            {activeChild}
          </div>
        ) : activeChild}
      </CSSTransition>
    );
  }
}
