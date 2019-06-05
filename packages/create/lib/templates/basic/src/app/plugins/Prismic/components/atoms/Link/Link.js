import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';
import Clickable from 'components/Clickable';
import { linkResolver } from 'prismic/helpers';

import './Link.scss';

export default class PrismicLink extends PureComponent {
  static propTypes = {
    linkProps: PropTypes.shape({
      url: PropTypes.string.isRequired,
      target: PropTypes.string,
    }).isRequired,
    linkStyle: PropTypes.string,
    styledAs: PropTypes.string,
  }

  static defaultProps = {
    styledAs: 'button',
    linkStyle: '',
  }

  static LINK_STYLES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
  }

  render() {
    const {
      linkProps: { url, target },
      linkStyle, styledAs, children,
    } = this.props;

    const href = linkResolver(url);

    return href ? (
      <Clickable
        {...target ? { rel: 'noopener', target } : {}}
        as={Link}
        styledAs={styledAs}
        isInverted={linkStyle === PrismicLink.LINK_STYLES.SECONDARY}
        href={href}
        isExternal={href === url}
        asNextLink={href !== url}
      >
        {children}
      </Clickable>
    ) : null;
  }
}
