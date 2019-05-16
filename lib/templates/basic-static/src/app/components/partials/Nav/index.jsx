import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable } from 'firestudio-ui';
//
import Link from '@elements/Link';

export default class Nav extends React.PureComponent {
  static renderLink(to, text) {
    return (
      <Clickable
        href={to}
        as={Link}
        styledAs="a"
        prefetch
        asNextLink
        className="hidden sm:flex h-full items-center mx-4 hover:text-blue"
      >
        {text}
      </Clickable>
    );
  }

  render() {
    return (
      <nav className="nav h-full bg-blue-darker text-white font-medium">
        <div className="mx-auto flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Clickable
              href="/"
              as={Link}
              styledAs="none"
              isFlat
              prefetch
              asNextLink
              className="flex h-full items-center uppercase text-white font-bold mr-4"
            >
              <span className="mr-4 text-blue"><FontAwesomeIcon icon={['far', 'grin-tongue-squint']} /></span>
              <span>
                FireStudio
              </span>
            </Clickable>
            {Nav.renderLink('/about', 'About')}
            {Nav.renderLink('/pre-rendering', 'Static')}
            <div className="flex-grow" />
          </Flex>
        </div>
      </nav>
    );
  }
}
