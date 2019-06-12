import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Hr extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { className } = this.props;

    return (
      <hr className={`hr ${className}`} />
    );
  }
}
