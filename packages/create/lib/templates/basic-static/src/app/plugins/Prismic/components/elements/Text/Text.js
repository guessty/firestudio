import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RichText from 'prismic/atoms/RichText';

import './Text.scss';

export default class Text extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    theme: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.shape({})),
  }

  static defaultProps = {
    className: '',
    theme: undefined,
    content: [],
  }

  render() {
    const { className, theme, content } = this.props;
    const textClassNames = classnames(
      'PrismicText',
      { [`PrismicText--${theme}`]: Boolean(theme) },
      [className],
    );

    return (
      <div className={textClassNames}>
        <div className="PrismicText__container container">
          <RichText content={content} />
        </div>
      </div>
    );
  }
}
