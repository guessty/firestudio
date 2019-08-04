import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firestudio/ui';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <Hr />
          <p>To Do: Add Privacy Policy</p>
        </Flex>
      </Container>
    );
  }
}
