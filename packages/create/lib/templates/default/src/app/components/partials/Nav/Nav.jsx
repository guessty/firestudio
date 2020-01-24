import React, { PureComponent } from 'react';
import { Flex, Container } from '@firepress/ui';
//
import Link from '@elements/Link';
import SignInOutButton from '@elements/SignInOutButton';

export default class Nav extends PureComponent {
  render() {
    return (
      <nav className="nav h-20 bg-white text-black font-medium border-b">
        <Container className="flex h-full px-8">
          <Flex className="flex-row flex-grow items-center gap-between-4" childClassName="h-full">
            <Link
              href="/"
              styledAs="none"
              className="flex h-full items-center text-2xl font-bold mr-4"
            >
              Firepress
            </Link>
            <Link
              href="/private-page"
              styledAs="none"
              className="flex h-full items-center mr-4"
            >
              Private Page
            </Link>
            <Link
              href="/extra-route"
              styledAs="none"
              className="flex h-full items-center mr-4"
            >
              Extra Route
            </Link>
            <Link
              href="/route-with-dynamic-prop/12"
              styledAs="none"
              className="flex h-full items-center mr-4"
            >
              Route With Dynamic Prop
            </Link>
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
