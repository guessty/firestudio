import React, { PureComponent } from 'react';
import { Flex, Hr, Container } from '@firestudio/ui';
//

export default class Tutorials extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex>
            <h1 className="text-4xl font-semibold">Tutorials</h1>
          </Flex>
          <Hr />
        </Flex>
      </Container>
    );
  }
}
