import React, { PureComponent } from 'react';
import {
  Flex, BackgroundImage, Clickable, Container,
} from '@firestudio/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//

export default class extends PureComponent {
  render() {
    return (
      <div>
        <div className="relative h-64">
          <BackgroundImage url="/static/images/old-car.jpg" />
          <Container className="relative">
            <Flex className="gap-around-8">
              <div>
                <h1 className="text-4xl font-semibold">
                  Welcome to Firepress
                </h1>
                <p>Firebase web apps made simple.</p>
              </div>
            </Flex>
          </Container>
        </div>
        <Container>
          <Flex className="gap-around-8">
            <h2 className="text-3xl font-semibold text-center">Get Started</h2>
            <Flex as="nav" className="flex-row flex-wrap gap-between-8" childClassName="w-full sm:w-1/2 lg:w-1/4">
              <Clickable
                as="a"
                styledAs="button"
                href="/documentation/finish-setup"
                isRaised
                className="p-4 w-full text-xl text-white bg-blue-800 hocus:bg-blue-900"
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
                className="p-4 w-full text-xl text-white bg-blue-800 hocus:bg-blue-900"
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
                className="p-4 w-full text-xl text-white bg-blue-800 hocus:bg-blue-900"
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
                className="p-4 w-full text-xl text-white bg-blue-800 hocus:bg-blue-900"
              >
                <Flex as="span" className="gap-around-2">
                  <FontAwesomeIcon icon={['fas', 'graduation-cap']} size="2x" />
                  Tutorials
                </Flex>
              </Clickable>
            </Flex>
          </Flex>
        </Container>
      </div>
    );
  }
}
