import React, { Component } from 'react';
import { Flex, Container } from '@firestudio/ui';
//

export default class DynamicPage extends Component {
  static isDynamic = true

  static async getPageData(query) {
    return {
      name: 'tutorial page',
      query,
    };
  }

  render() {
    const { isFetchingPageData, PageLoader, pageData } = this.props;

    return (
      <Container className="flex-grow">
        {isFetchingPageData ? (
          <Flex className="gap-around-8 flex-grow" childClassName="flex-grow">
            <PageLoader />
          </Flex>
        ) : (
          <Flex className="gap-around-8">
            <Flex className="gap-between-2">
              <h1>Dynamic Route with {JSON.stringify(pageData)}</h1>
            </Flex>
          </Flex>
        )}
      </Container>
    );
  }
}
