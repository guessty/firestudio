import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable } from '@firestudio/ui';
//
import Link from '@elements/Link';
import Container from '@elements/Container';
//

const Footer = () => (
  <footer className="h-full bg-blue-darker text-white">
    <Container className="h-full px-8">
      <Flex className="gap-around-8 justify-center items-center">
        <Clickable
          href="/"
          as={Link}
          styledAs="none"
          prefetch
          asNextLink
          className="flex h-full items-center text-white text-2xl font-bold mr-4"
        >
          Firestudio
        </Clickable>
      </Flex>
    </Container>
  </footer>
);

export default Footer;
