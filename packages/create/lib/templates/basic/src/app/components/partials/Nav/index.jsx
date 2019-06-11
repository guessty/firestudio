import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable } from '@firestudio/ui';
//
import Link from '@elements/Link';
import Drawer from '@elements/Drawer';
import Container from '@elements/Container';

export default class Nav extends PureComponent {
  static renderLink(to, text) {
    return (
      <Drawer.Trigger
        target="menu"
        render={({ toggleDialog }) => (
          <Clickable
            href={to}
            as={Link}
            styledAs="a"
            prefetch
            asNextLink
            className="flex h-full items-center mx-4 hover:text-blue"
            onClick={toggleDialog}
          >
            {text}
          </Clickable>
        )}
      />
    );
  }

  render() {
    return (
      <nav className="nav h-20 bg-blue-darker text-white font-medium">
        <Container className="flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Clickable
              href="/"
              as={Link}
              styledAs="none"
              prefetch
              asNextLink
              className="flex h-full items-center text-white text-2xl font-bold mr-4"
            >
              Firestudio
            </Clickable>
            <div className="flex-grow" />
            <Drawer.Trigger
              target="menu"
              render={({ toggleDialog }) => (
                <Clickable
                  className="flex h-full text-white hover:text-blue p-3"
                  onClick={toggleDialog}
                >
                  <FontAwesomeIcon icon={['fas', 'bars']} size="2x" />
                </Clickable>
              )}
            />
          </Flex>
        </Container>
        <Drawer
          name="menu"
        >
          <Drawer.Trigger
            target="menu"
            render={({ toggleDialog }) => (
              <Clickable
                className="absolute pin-t pin-r w-20 h-20 p-0 hover:text-blue"
                onClick={toggleDialog}
              >
                <FontAwesomeIcon icon={['fas', 'times']} size="2x" />
              </Clickable>
            )}
          />
          <Flex className="flex-grow gap-between-6">
            <hr />
            {Nav.renderLink('/', 'Home')}
            {Nav.renderLink('/about', 'About')}
            {Nav.renderLink('/pre-rendering', 'Static')}
          </Flex>
        </Drawer>
      </nav>
    );
  }
}
