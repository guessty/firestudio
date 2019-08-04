import React, { PureComponent } from 'react';
import { Flex, Clickable, Container } from '@firestudio/ui';
//

export default class Footer extends PureComponent {
  render() {
    return (
      <footer className="h-full bg-blue-800 text-white">
        <Container className="h-full px-8">
          <Flex className="gap-around-8 justify-center items-center">
            <Clickable
              href="/"
              as="a"
              styledAs="none"
              className="flex h-full items-center text-white text-2xl font-bold mr-4"
            >
              Firepress
            </Clickable>
          </Flex>
        </Container>
      </footer>
    );
  }
}
