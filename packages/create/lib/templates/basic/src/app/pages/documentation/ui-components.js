import React, { PureComponent } from 'react';
import { Flex, Hr } from '@firestudio/ui';

import Container from '@elements/Container';

export default class UIComponents extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex>
            <h1 className="text-4xl font-semibold">UI Components</h1>
          </Flex>
          <Hr />
        </Flex>
      </Container>
    );
  }
}
