import React, { PureComponent } from 'react';
import { Flex, Clickable, Container } from '@firepress/ui';
//

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="h-full bg-white text-black border-t">
        <Container className="h-full px-8">
          <Flex className="gap-around-8 justify-center items-center">
            <Clickable
              href="/"
              as="a"
              styledAs="none"
              className="flex h-full items-center text-2xl font-bold mr-4"
            >
              Firepress
            </Clickable>
          </Flex>
        </Container>
      </footer>
    );
  }
}
