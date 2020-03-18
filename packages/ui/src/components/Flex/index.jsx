import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Flex extends PureComponent {
  static propTypes = {
    as: PropTypes.oneOf(['div', 'span', 'header', 'nav', 'main', 'section', 'article', 'aside', 'footer']),
    className: PropTypes.string,
    childClassName: PropTypes.string,
  }

  static defaultProps = {
    as: 'div',
    className: '',
    childClassName: '',
  }

  static Component = ({ as, props, children }) => React.createElement(as, props, children);

  static isHidden(className) {
    return className.split(' ').find(splitClass => splitClass === 'hidden');
  }

  static hasFlexDirection(className) {
    const directions = {
      'flex-col': true,
      'flex-col-reverse': true,
      'flex-row': true,
      'flex-row-reverse': true,
    };

    return className.split(' ').find(splitClass => directions[splitClass]);
  }

  renderChildren() {
    const { as: Component, children, childClassName } = this.props;

    return React.Children.map(children, (child) => {
      if (child) {
        const typesArray = ['div', 'span', 'aside', 'article', 'section'];
        const classNamesArray = child.props && child.props.className ? child.props.className.split(' ') : [];

        if (typesArray.includes(child.type)
          && (classNamesArray.length === 0
            || (classNamesArray.length === 1 && classNamesArray[0] === 'flex-grow')
          )
        ) {
          return {
            ...child,
            ...child.props ? {
              props: {
                ...child.props,
                ...child.props.className ? {
                  className: `${child.props.className} ${childClassName}`,
                } : {},
              },
            } : {},
          };
        }

        return Component !== 'span' ? (
          <div className={childClassName}>{child}</div>
        ) : (
          <span className={childClassName}>{child}</span>
        );
      }

      return child;
    });
  }

  render() {
    const {
      as: Component, className, childClassName,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={`
          ${Flex.isHidden(className) ? 'hidden' : 'flex'}
          ${Flex.hasFlexDirection(className) ? '' : 'flex-col'}
          ${className}
        `}
      >
        {this.renderChildren()}
      </Component>
    );
  }
}

export default Flex;
