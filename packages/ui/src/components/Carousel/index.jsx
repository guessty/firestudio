import React, { Component } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import VisuallyHidden from '@reach/visually-hidden';
import classnames from 'classnames';

export default class Carousel extends Component {
  static propTypes = {
    className: PropTypes.string,
    itemClassName: PropTypes.string,
    settings: PropTypes.shape({}).isRequired,
    nextArrow: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    prevArrow: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    className: '',
    itemClassName: '',
    nextArrow: <Carousel.defaultNextArrow />,
    prevArrow: <Carousel.defaultPrevArrow />,
  }

  static defaultNextArrow({
    className, extraClassName = '',
    onClick, visuallyHiddenLabel = 'Next',
    icon = (<span>❯</span>),
  }) {
    return (
      <button
        type="button"
        className={`${className} ${extraClassName}`}
        onClick={onClick}
      >
        <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
        {icon}
      </button>
    );
  }

  static defaultPrevArrow({
    className, extraClassName = '',
    onClick, visuallyHiddenLabel = 'Previous',
    icon = (<span>❮</span>),
  }) {
    return (
      <button
        type="button"
        className={`${className} ${extraClassName}`}
        onClick={onClick}
      >
        <VisuallyHidden>{visuallyHiddenLabel}</VisuallyHidden>
        {icon}
      </button>
    );
  }

  render() {
    const {
      className, itemClassName, children,
      settings: newSettings,
      nextArrow, prevArrow,
    } = this.props;

    const NextArrowComponent = React.cloneElement(nextArrow, {
      ...nextArrow.props,
      extraClassName: `carousel__next ${nextArrow.props.className || ''}`,
    });

    const PrevArrowComponent = React.cloneElement(prevArrow, {
      ...prevArrow.props,
      extraClassName: `carousel__prev ${prevArrow.props.className || ''}`,
    });

    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      nextArrow: NextArrowComponent,
      prevArrow: PrevArrowComponent,
      ...newSettings,
    };

    const childArray = Array.isArray(children) ? children : [children];

    const carouselClassName = classnames(
      'carousel',
      { 'carousel--has-dots': settings.dots },
      [className],
    );

    return (
      <div className={carouselClassName}>
        <Slider className="carousel__slider" {...settings}>
          {childArray.map((child, index) => {
            const key = `carousel-item-${index}`;

            return (
              <div
                key={key}
                className={`carousel__item ${itemClassName}`}
              >
                {child}
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
