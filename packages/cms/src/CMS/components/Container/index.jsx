import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Base from '../Base';

class Container extends PureComponent {
  static propTypes = {
    as: PropTypes.oneOf(['div', 'span', 'header', 'nav', 'main', 'section', 'article', 'aside', 'footer']),
    children: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]).isRequired,
    className: PropTypes.string,
    _className: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
    className: '',
    _className: 'flex flex-col',
  };

  render() {
    const {
      as: Component, children, className, _className, ...props
    } = this.props;

    const containerClassName = `
      ${_className}
      ${className.includes('gap-between-') ? '' : 'gap-between-5'}
      ${className}
    `;

    const childArray = Array.isArray(children) ? children : [children];

    return (
      <Component className={containerClassName}>
        {childArray.map((child, index) => (child ? (
          <Base
            key={`container_${child.component}_${index}`} // eslint-disable-line react/no-array-index-key
            {...child}
            {...props}
          />
        ) : null))}
      </Component>
    );
  }
}

export default Container;
