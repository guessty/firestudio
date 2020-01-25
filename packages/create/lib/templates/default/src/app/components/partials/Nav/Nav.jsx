import React, { PureComponent } from 'react';
import { Flex, Container } from '@firepress/ui';
//
import Link from '@elements/Link';
import SignInOutButton from '@elements/SignInOutButton';

export default class Nav extends PureComponent {
  static renderLink(text, href) {
    return (
      <Link
        href={href}
        styledAs="none"
        className="flex h-full items-center mr-4 whitespace-no-wrap"
      >
        {text}
      </Link>
    );
  }

  render() {
    return (
      <nav className="nav h-20 bg-white text-black font-medium border-b">
        <Container className="flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Link
              href="/"
              styledAs="none"
              className="flex flex-row h-full items-center text-2xl font-bold mr-4"
            >
              <img className="block w-10 mr-2" alt="logo" src="/static/firepress-logo.webp" />
              <span>Firepress</span>
            </Link>
            {Nav.renderLink('Private Page', '/private-page')}
            {Nav.renderLink('Extra Route', '/extra-route')}
            {Nav.renderLink('Route With Dynamic Prop', '/route-with-dynamic-prop/12')}
            <div className="flex-grow" />
            <div className="flex h-full items-center">
              <SignInOutButton />
            </div>
          </Flex>
        </Container>
      </nav>
    );
  }
}
