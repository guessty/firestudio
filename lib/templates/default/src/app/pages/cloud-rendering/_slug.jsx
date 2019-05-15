import React, { Component } from 'react';
import { Flex } from 'firestudio-ui';
//

const AltLoader = () => (
  <h2 style={{ padding: '60px 20px', textAlign: 'center', color: 'blue' }}>Loading...</h2>
);

export default class DynamicPage extends Component {
  static getInitialProps({ query }) {
    return { query };
  }

  render() {
    const { query: { slug }, isPageLoading } = this.props;

    console.log(slug);

    return isPageLoading ? (
      <Flex className="gap-around-8">
        <AltLoader />
      </Flex>
    ) : (
      <Flex className="gap-around-8">
        <Flex className="gap-between-2">
          <h1>Dynamic Route</h1>
          <p>{slug}</p>
        </Flex>
      </Flex>
    );
  }
}
