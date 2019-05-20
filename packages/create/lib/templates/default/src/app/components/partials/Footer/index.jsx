import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Clickable } from '@firestudio/ui';
//
import Link from '@elements/Link';
//

const Footer = () => (
  <footer className="h-full bg-blue-darker text-white">
    <div className="container mx-auto h-full px-8">
      <Flex className="gap-around-8 justify-center items-center">
        <Clickable
          href="/"
          as={Link}
          styledAs="none"
          isFlat
          prefetch
          asNextLink
          className="flex h-full items-center uppercase text-white font-bold mr-4"
        >
          <span className="mr-4 text-blue"><FontAwesomeIcon icon={['far', 'grin-tongue-squint']} /></span>
          <span>
            FireStudio
          </span>
        </Clickable>
      </Flex>
    </div>
  </footer>
);

export default Footer;
