import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Image from 'prismic/atoms/Image';
import RichText from 'prismic/atoms/RichText';
import Link from 'prismic/atoms/Link';

import { bind } from 'decorators';

import './Banner.scss';

export default class Banner extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    imageUrl: PropTypes.string,
    theme: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.shape({})),
    layout: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.shape({
        url: PropTypes.string.isRequired,
        target: PropTypes.string,
      }),
      style: PropTypes.string,
    })),
  }

  static defaultProps = {
    className: '',
    theme: undefined,
    content: [],
    imageUrl: undefined,
    layout: undefined,
    buttons: [],
  }

  static getScrollPosition(offsetTop, offsetHeight) {
    return Number.isFinite(offsetTop) && Number.isFinite(offsetHeight)
      ? offsetTop + offsetHeight : 0;
  }

  scrollRef = React.createRef();

  @bind
  scrollToRef() {
    const { current } = this.scrollRef;
    if (current) {
      const { offsetTop, offsetHeight } = current;
      window.scrollTo({
        top: Banner.getScrollPosition(offsetTop, offsetHeight),
        behavior: 'smooth',
      });
    }
  }

  renderLinks() {
    const { buttons } = this.props;

    return Array.isArray(buttons) && buttons.length ? (
      <div className="PrismicBanner__button-container">
        {
          buttons.map(button => button.href && (
            <div key={button.label}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                linkProps={button.href}
                linkStyle={button.style}
              >
                {button.label || button.href}
              </Link>
            </div>
          ))
        }
      </div>
    ) : null;
  }

  render() {
    const {
      imageUrl,
      content,
      className,
      layout,
      theme,
    } = this.props;

    const bannerClassNames = classnames({
      PrismicBanner: true,
      [`PrismicBanner--${theme}`]: Boolean(theme),
      [`PrismicBanner--${layout}`]: Boolean(layout),
      [className]: true,
    });

    return (
      <div className={bannerClassNames} ref={this.scrollRef}>
        <div className="PrismicBanner__container container">
          {imageUrl ? (
            <div className="PrismicBanner__image-container">
              <Image
                url={imageUrl}
                className="PrismicBanner__image"
              />
            </div>
          ) : null}
          <div className="PrismicBanner__content">
            <RichText content={content} />
            {this.renderLinks()}
          </div>
        </div>
      </div>
    );
  }
}
