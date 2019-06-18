import React, { PureComponent } from 'react';
import { Flex, Clickable, Container } from '@firestudio/ui';
//

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex className="gap-between-4">
            <h1 className="text-4xl font-semibold">
              Welcome to Firestudio
            </h1>
            <Flex>
              <h2 className="text-2xl font-semibold">The Basic Template</h2>
              <p>
                Designed for learning and simpler projects.
              </p>
            </Flex>
            <Clickable
              href="/documentation"
              as="a"
              styledAs="button"
              isRaised
              className="text-blue-900 bg-white"
            >
              Get Started
            </Clickable>
          </Flex>
        </Flex>
      </Container>
    );
  }
}
