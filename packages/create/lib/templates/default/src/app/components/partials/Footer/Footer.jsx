import React, { PureComponent } from 'react';
import { Flex, Container } from '@firepress/ui';
//
import Link from '@elements/Link';

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="h-full bg-white text-black border-t">
        <Container className="h-full px-8">
          <Flex className="flex-gap-8 p-8 justify-center items-center">
            <Link
              href="/"
              styledAs="none"
              className="flex h-full items-center text-2xl font-bold mr-4"
            >
              Firepress
            </Link>
            <Flex className="flex-row gap-between-8">
              <Link
                href="/privacy-policy"
                styledAs="none"
                className="flex h-full items-center mr-4"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                styledAs="none"
                className="flex h-full items-center mr-4"
              >
                Terms and Conditions
              </Link>
            </Flex>
          </Flex>
        </Container>
      </footer>
    );
  }
}
