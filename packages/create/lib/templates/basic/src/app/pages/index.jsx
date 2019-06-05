import React, { PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable } from '@firestudio/ui';
//
import Link from '@elements/Link';
import Container from '@elements/Container';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex className="gap-between-2">
          <h1>Firestudio</h1>
          <strong>
            Get ready to play with fire!
            <FontAwesomeIcon icon={['far', 'grin-tongue-squint']} />
          </strong>
          </Flex>
          <hr />
          <h2>Develop and host web apps without the configuration.</h2>
          <Clickable
            href="/about"
            as={Link}
            styledAs="a"
            asNextLink
          >
            Find out more!
          </Clickable>
        </Flex>
      </Container>
    );
  }
}
