import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firepress/ui';

export default class PrivatePage extends PureComponent {
  static isPrivate = true;

  render() {
    return (
      <Container>
        <Flex className="flex-gap-8 p-8">
          <h1 className="text-4xl font-semibold">Private Page</h1>
          <Hr />
          <p>This page will only be accessible once you have been authentcated.</p>
        </Flex>
      </Container>
    );
  }
}
