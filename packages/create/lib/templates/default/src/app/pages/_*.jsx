import React, { PureComponent } from 'react';
import { Container, Flex, Hr } from '@firepress/ui';

export default class DynamicPage extends PureComponent {
  static async getPageConfig({ query }) {
    return {
      query,
    };
  }

  render() {
    const { pageConfig: { query } } = this.props;

    return (
      <Container>
        <Flex className="gap-around-8">
          <h1 className="text-4xl font-semibold">Dynamic Page</h1>
          <Hr />
          <p>
            {JSON.stringify(query)}
          </p>
        </Flex>
      </Container>
    );
  }
}
