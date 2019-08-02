import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable, Container } from '@firestudio/ui';
//
import Drawer from '@elements/Drawer';
import SignInButton from '@elements/SignInButton';

export default class Nav extends PureComponent {
  static renderLink(to, text) {
    return (
      <Drawer.Trigger
        target="menu"
        render={({ toggleDialog }) => (
          <Clickable
            href={to}
            as="a"
            className="flex h-full items-center mx-4 hover:text-blue-600"
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
      <nav className="nav h-20 bg-blue-800 text-white font-medium">
        <Container className="flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Clickable
              href="/"
              as="a"
              styledAs="none"
              className="flex h-full items-center text-white text-2xl font-bold mr-4"
            >
              Firestudio
            </Clickable>
            <div className="flex-grow" />
            <div className="flex h-full items-center">
              <SignInButton />
            </div>
            <div className="flex h-full items-center">
              <div className="block border-r border-white w-1 h-10 m-4" />
            </div>
            <Drawer.Trigger
              target="menu"
              render={({ toggleDialog }) => (
                <Clickable
                  className="flex h-full text-white hover:text-blue-500 p-3"
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
                className="absolute top-0 right-0 w-20 h-20 p-0 hover:text-blue-500"
                onClick={toggleDialog}
              >
                <FontAwesomeIcon icon={['fas', 'times']} size="2x" />
              </Clickable>
            )}
          />
          <Flex className="flex-grow gap-between-6">
            <hr />
            {Nav.renderLink('/', 'Home')}
            {Nav.renderLink('/finish-setup', 'Finish Setup')}
            {Nav.renderLink('/core-features', 'Core Features')}
            {Nav.renderLink('/ui-components', 'UI Components')}
            {Nav.renderLink('/tutorials/1', 'Tutorial 1')}
          </Flex>
        </Drawer>
      </nav>
    );
  }
}
