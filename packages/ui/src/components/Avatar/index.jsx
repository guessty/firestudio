import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class Avatar extends PureComponent {
  static propTypes = {
    picture: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    picture: undefined,
    text: undefined,
    className: '',
  }

  render() {
    const { picture, text, className } = this.props;

    return (
      <div
        className={`avatar ${className}`}
        style={{
          background: picture ? `url(${picture}) 50%/cover no-repeat` : '',
        }}
      >
        {!picture ? (<span>{text ? text.charAt(0) : '☻'}</span>) : null}
      </div>
    );
  }
}
