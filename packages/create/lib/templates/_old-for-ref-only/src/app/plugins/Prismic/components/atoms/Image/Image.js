import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Image.scss';

export default class Image extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    size: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    size: 'cover',
  }

  render() {
    const { url, size, className } = this.props;

    return (
      <div className={`PrismicImage PrismicImage--${size}`}>
        <div
          className={`PrismicImage__image ${className}`}
          style={{
            backgroundImage: `url(${url})`,
          }}
        />
      </div>
    );
  }
}
