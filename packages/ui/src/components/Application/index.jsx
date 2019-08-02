import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Application extends Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  static Screen = ({ children }) => (
    <div className="application__screen">
      {children}
    </div>
  )

  render() {
    const { children } = this.props;

    return (
      <div className="application">
        {children}
      </div>
    );
  }
}