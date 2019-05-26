import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Loader extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }
  
  static defaultProps = {
    className: ''
  }

  render() {
    const { className } = this.props;
    
    return (
      <div className={`loader ${className}`}>
        <div className="loader__spinner" />
      </div>
    );
  }
}
