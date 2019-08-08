import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firepress/ui';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <h1 className="text-4xl font-semibold">Terms and Conditions</h1>
          <Hr />
          <p>To Do: Add Terms and Conditions</p>
        </Flex>
      </Container>
    );
  }
}
