import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default class Transition extends Component {
  static propTypes = {
    in: PropTypes.string,
    out: PropTypes.string,
    update: PropTypes.string,
    isMounted: PropTypes.bool,
    unmountOnExit: PropTypes.bool,
    onExited: PropTypes.func,
    children: PropTypes.element,
  }

  static defaultProps = {
    in: 'fade',
    out: null,
    update: 'fade',
    isMounted: true,
    unmountOnExit: true,
    onExited: () => {},
    children: undefined,
  }

  static TRANSITIONS = {
    NONE: 'none',
    FADE: 'fade',
    FADE_DOWN: 'fade-down',
    FADE_UP: 'fade-up',
    FADE_DROP: 'fade-drop',
    DOWN: 'down',
    UP: 'up',
    DROP: 'drop',
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
    const { isMounted } = this.props;

    if (isMounted && !isUpdating && nextChild.key !== activeChild.key) {
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

  handleEntered() {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      isEntered: true,
    });
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
      isMounted, unmountOnExit,
      in: inTransition, out, update,
    } = this.props;
    const { isUpdating, activeChild } = this.state;
    const outTransition = out || inTransition;
    const timeout = !isMounted && outTransition === Transition.TRANSITIONS.NONE ? 0 : 150;

    return (
      <CSSTransition
        in={isMounted}
        timeout={timeout}
        classNames={`transition--${isMounted ? inTransition : outTransition}`}
        onEntered={this.handleEntered}
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
