import React, { PureComponent } from 'react';
import { Flex, Clickable } from '@firestudio/ui';
//
import Link from '@elements/Link';
import Container from '@elements/Container';

export default class extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <h1>About</h1>
          <hr />
          <p>
            Firestudio was created with the aim of providing a &quot;zero-config&quot; solution to
            developing web applications with ReactJS and hosting them on Google Firebase.
          </p>
          <Flex className="gap-between-12">
            <Flex className="gap-between-6">
              <h2>What&apos;s in the box?</h2>
              <Flex className="gap-between-4">
                <ol>
                  <li>
                    <strong>Linting Support</strong>
                    - Linting is configured and ready to go.
                  </li>
                  <li>
                    <strong>Static Hosting</strong>
                    - See
                    <Clickable
                      href="/pre-rendering"
                      as={Link}
                      styledAs="a"
                      asNextLink
                    >
                      pre-rendering
                    </Clickable>
                  </li>
                  <li>
                    <strong>Cloud Functions</strong>
                    - Extend your app further by using Google Cloud Functions.
                  </li>
                  <li>
                    <strong>Unstated (Context API) State Management</strong>
                    - Simple and straight forward.
                  </li>
                </ol>
              </Flex>
            </Flex>
            <Flex className="gap-between-6">
              <h2>Credit where credit is due</h2>
              <Flex className="gap-between-4">
                <p>
                  At its core Firestudio is essentially a re-packaged NextJS application
                  that has been configured to work with Googles Firebase platform.
                </p>
                <p>
                  So big thanks go out to the teams behind NextJS and Firebase for
                  creating such awesome products!
                </p>
              </Flex>
            </Flex>
          </Flex>
          <Flex className="gap-between-12">
            <Flex className="gap-between-6">
              <h2>What&apos;s in the box?</h2>
              <Flex className="gap-between-4">
                <ol>
                  <li>
                    <strong>Linting Support</strong>
                    - Linting is configured and ready to go.
                  </li>
                  <li>
                    <strong>Static Hosting</strong>
                    - See
                    <Clickable
                      href="/pre-rendering"
                      as={Link}
                      styledAs="a"
                      asNextLink
                    >
                      pre-rendering
                    </Clickable>
                  </li>
                  <li>
                    <strong>Cloud Functions</strong>
                    - Extend your app further by using Google Cloud Functions.
                  </li>
                  <li>
                    <strong>Unstated (Context API) State Management</strong>
                    - Simple and straight forward.
                  </li>
                </ol>
              </Flex>
            </Flex>
            <Flex className="gap-between-6">
              <h2>Credit where credit is due</h2>
              <Flex className="gap-between-4">
                <p>
                  At its core Firestudio is essentially a re-packaged NextJS application
                  that has been configured to work with Googles Firebase platform.
                </p>
                <p>
                  So big thanks go out to the teams behind NextJS and Firebase for
                  creating such awesome products!
                </p>
              </Flex>
            </Flex>
          </Flex>
          <Flex className="gap-between-12">
            <Flex className="gap-between-6">
              <h2>What&apos;s in the box?</h2>
              <Flex className="gap-between-4">
                <ol>
                  <li>
                    <strong>Linting Support</strong>
                    - Linting is configured and ready to go.
                  </li>
                  <li>
                    <strong>Static Hosting</strong>
                    - See
                    <Clickable
                      href="/pre-rendering"
                      as={Link}
                      styledAs="a"
                      asNextLink
                    >
                      pre-rendering
                    </Clickable>
                  </li>
                  <li>
                    <strong>Cloud Functions</strong>
                    - Extend your app further by using Google Cloud Functions.
                  </li>
                  <li>
                    <strong>Unstated (Context API) State Management</strong>
                    - Simple and straight forward.
                  </li>
                </ol>
              </Flex>
            </Flex>
            <Flex className="gap-between-6">
              <h2>Credit where credit is due</h2>
              <Flex className="gap-between-4">
                <p>
                  At its core Firestudio is essentially a re-packaged NextJS application
                  that has been configured to work with Googles Firebase platform.
                </p>
                <p>
                  So big thanks go out to the teams behind NextJS and Firebase for
                  creating such awesome products!
                </p>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    );
  }
}
