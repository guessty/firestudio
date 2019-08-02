import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Avatar extends PureComponent {
  static propTypes = {
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    photoURL: undefined,
    displayName: undefined,
    className: '',
  }

  render() {
    const { photoURL, displayName, className } = this.props;

    return (
      <div
        className={`avatar ${className}`}
        style={{
          background: photoURL ? `url(${photoURL}) 50%/cover no-repeat` : '',
        }}
      >
        {!photoURL ? (<span>{displayName ? displayName.charAt(0) : '☻'}</span>) : null}
      </div>
    );
  }
}
