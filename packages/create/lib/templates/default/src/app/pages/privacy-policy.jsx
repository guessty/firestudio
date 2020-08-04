import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firepress/ui';

export default class PrivacyPage extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="flex-gap-8 p-8">
          <h1 className="text-4xl font-semibold">Privacy Policy</h1>
          <Hr />
          <p>To Do: Add Privacy Policy</p>
        </Flex>
      </Container>
    );
  }
}
