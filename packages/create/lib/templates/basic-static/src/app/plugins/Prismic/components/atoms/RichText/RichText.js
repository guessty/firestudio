import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';

import Hr from 'ui/Hr';
import Link from 'prismic/atoms/Link';

import './RichText.scss';

export default class _RichText extends PureComponent {
  static propTypes = {
    content: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
    ]).isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  static htmlSerializer(type, element, _content, children, key) {
    const { Elements } = RichText;
    const { data } = element;

    if (type === Elements.paragraph) {
      if (children && children[0] && children[0][0] === '---') {
        return (
          <span key={key} className="p-2">
            <Hr className="sm:mx-0 border-grey-base border-b-4 rounded w-16" />
          </span>
        );
      }
    }

    if (type === Elements.hyperlink) {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          key={key}
          linkProps={data}
          styledAs="a"
        >
          {children}
        </Link>
      );
    }

    return null;
  }

  render() {
    const { content, className } = this.props;

    return (
      <div className={`PrismicRichText ${className}`}>
        {content && RichText.render(content, null, _RichText.htmlSerializer)}
      </div>
    );
  }
}
