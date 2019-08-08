import React, { PureComponent } from 'react';
import {
  Flex, Clickable, Container,
} from '@firepress/ui';
//

export default class extends PureComponent {
  render() {
    return (
      <Flex
        className="flex-grow"
        style={{
          backgroundImage: 'linear-gradient(to right, #2d3748, #4a5568)',
        }}
      >
        <Container className="relative text-white">
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
              isRaised
              target="_blank"
              className="text-xl text-black rounded bg-white hocus:bg-gray-100"
            >
              Read Documentation
            </Clickable>
          </Flex>
        </Container>
      </Flex>
    );
  }
}
