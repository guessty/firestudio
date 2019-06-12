import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable, Hr } from '@firestudio/ui';
//
import Container from '@elements/Container';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex>
            <h1 className="text-4xl font-semibold">Firestudio</h1>
            <strong>
              Get ready to play with fire!
              <FontAwesomeIcon icon={['far', 'grin-tongue-squint']} />
            </strong>
          </Flex>
          <Hr />
          <h2 className="text-2xl font-semibold">Develop and host web apps without the configuration.</h2>
          <Clickable
            href="/about"
            as="a"
          >
            Find out more!
          </Clickable>
        </Flex>
      </Container>
    );
  }
}
