import React, { PureComponent } from 'react';
import { Flex, Hr, Clickable } from '@firestudio/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//
import Container from '@elements/Container';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex>
            <h1 className="text-4xl font-semibold">Documentation</h1>
          </Flex>
          <Hr />
          <Flex className="gap-between-4">
            <p>This template is designed for simple projects and as an introduction to the Firestudio platform.</p>
            <p>It is best suited for:</p>
            <ol className="list-disc pl-4">
              <li>Informational Websites e.g A small business offering a service.</li>
              <li>A Professional Portfolio.</li>
              <li>A Blog.</li>
            </ol>
            <p>View the topics below for further guidance.</p>
          </Flex>
          <Flex as="nav" className="flex-row flex-wrap gap-between-8" childClassName="w-full sm:w-1/2">
            <Clickable
              as="a"
              styledAs="button"
              href="/documentation/finish-setup"
              isRaised
              className="text-xl text-white bg-blue-800 hocus:bg-blue-900"
            >
              <Flex as="span" className="gap-around-2">
                <FontAwesomeIcon icon={['fas', 'cogs']} size="2x" />
                Finish Setup
              </Flex>
            </Clickable>
            <Clickable
              as="a"
              styledAs="button"
              href="/documentation/core-features"
              isRaised
              className="text-xl text-white bg-blue-800 hocus:bg-blue-900"
            >
              <Flex as="span" className="gap-around-2">
                <FontAwesomeIcon icon={['fas', 'terminal']} size="2x" />
                Core Features
              </Flex>
            </Clickable>
            <Clickable
              as="a"
              styledAs="button"
              href="/documentation/ui-components"
              isRaised
              className="text-xl text-white bg-blue-800 hocus:bg-blue-900"
            >
              <Flex as="span" className="gap-around-2">
                <FontAwesomeIcon icon={['fas', 'shapes']} size="2x" />
                UI Components
              </Flex>
            </Clickable>
            <Clickable
              as="a"
              styledAs="button"
              href="/documentation/tutorials"
              isRaised
              className="text-xl text-white bg-blue-800 hocus:bg-blue-900"
            >
              <Flex as="span" className="gap-around-2">
                <FontAwesomeIcon icon={['fas', 'graduation-cap']} size="2x" />
                Tutorials
              </Flex>
            </Clickable>
          </Flex>
        </Flex>
      </Container>
    );
  }
}
