import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firepress/ui';

export default class DynamicPage extends PureComponent {
  static useClientFallback = true;

  render() {
    const { args } = this.props;

    return (
      <Container>
        <Flex className="flex-gap-8 p-8">
          <h1 className="text-4xl font-semibold">Dynamic Page</h1>
          <Hr />
          <p>
            {JSON.stringify(args)}
          </p>
        </Flex>
      </Container>
    );
  }
}
