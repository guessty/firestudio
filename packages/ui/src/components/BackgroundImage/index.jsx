import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class BackgroundImage extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  render() {
    const { url, className } = this.props;

    return (
      <div className="background-image">
        <div
          className={`background-image__image ${className}`}
          style={{
            backgroundImage: `url(${url})`,
          }}
        />
      </div>
    );
  }
}
