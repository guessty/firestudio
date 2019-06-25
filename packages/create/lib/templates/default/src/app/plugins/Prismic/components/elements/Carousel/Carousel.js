import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Carousel from 'components/Carousel';
import Banner from 'prismic/molecules/Banner';
import { User } from 'decorators';

import './Carousel.scss';

@User
export default class PrismicCarousel extends PureComponent {
  static propTypes = {
    theme: PropTypes.string,
    className: PropTypes.string,
    settings: PropTypes.shape({}),
    items: PropTypes.arrayOf(PropTypes.shape({})),
    user: PropTypes.shape({}).isRequired,
  }

  static defaultProps = {
    theme: undefined,
    className: '',
    items: [],
    settings: {
      infinite: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  }

  static FilterCarouselItems(items, user) {
    const isLoggedIn = user.isLoggedIn();

    return items.filter(item => (
      item.loginRequirement === 'none'
      || (item.loginRequirement === 'post' && isLoggedIn)
      || (item.loginRequirement === 'pre' && !isLoggedIn)
    ));
  }

  render() {
    const {
      theme,
      items,
      settings,
      className,
      user,
    } = this.props;

    const carouselClassName = classnames(
      'PrismicCarousel',
      { [`PrismicCarousel--${theme}`]: theme },
      [className],
    );

    const carouselItems = PrismicCarousel.FilterCarouselItems(items, user);

    return (
      <Carousel
        settings={settings}
        className={carouselClassName}
        itemClassName="PrismicCarousel__item"
      >
        {carouselItems.map((item, index) => {
          const key = `carousel-item-${index}`;

          return (
            <Banner
              key={key}
              theme={theme}
              {...item}
            />
          );
        })}
      </Carousel>
    );
  }
}
