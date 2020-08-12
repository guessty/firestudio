import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Renderer from '../Renderer';

class Container extends PureComponent {
  static propTypes = {
    as: PropTypes.oneOf(['div', 'span', 'header', 'nav', 'main', 'section', 'article', 'aside', 'footer']),
    children: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
    ]),
    className: PropTypes.string,
    _className: PropTypes.string,
  };

  static defaultProps = {
    as: 'div',
    className: '',
    _className: 'flex flex-col',
    children: [],
  };

  render() {
    const {
      as: Component, children, className, _className, ...props
    } = this.props;

    const containerClassName = `
      ${_className}
      ${className}
    `;

    const childArray = Array.isArray(children) ? children : [children];

    return (
      <Component className={containerClassName}>
        {childArray.map((child, index) => (child ? (
          <Renderer
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
