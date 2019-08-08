import React, { PureComponent } from 'react';
import {
  Flex, Clickable, Container,
} from '@firepress/ui';
//

export default class extends PureComponent {
  render() {
    return (
      <Flex className="flex-grow">
        <Container className="relative text-black">
          <Flex className="gap-around-8">
            <div>
              <h1 className="text-4xl font-semibold">
                Welcome to Firepress
              </h1>
              <p>Firebase web apps made simple.</p>
            </div>
            <Clickable
              as="a"
              styledAs="button"
              href="https://firepress.gitbook.io/documentation/"
              isExternal
              target="_blank"
              className="text-xl text-white rounded bg-gray-900 hocus:bg-gray-800"
            >
              Read Documentation
            </Clickable>
          </Flex>
        </Container>
      </Flex>
    );
  }
}
