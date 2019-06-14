import React, { PureComponent } from 'react';
import { Flex } from '@firestudio/ui';

export default class Main extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <Flex as="main" className="flex w-full flex-grow">
        {children}
      </Flex>
    );
  }
}
