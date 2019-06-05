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
          <Flex className="gap-between-2">
            <h1>Pre-rendering Pages</h1>
            <strong>Pages are exported to HTML for cost-effective hosting.</strong>
          </Flex>
          <hr />
          <Flex className="gap-between-4">
            <p>
              Firestudio is configured by default to export/prerender all of the pages to
              HTML so that they can be hosted through Firebase Hosting.
            </p>
            <p>This keeps the hosting costs of your application as low as possible.</p>
          </Flex>
          <h2>Pages with Dynamic Content</h2>
          <Flex className="gap-between-4">
            <p>For handling pages with dynamic content you have 2 options:</p>
            <p>
              <strong>1.</strong>
              Fetch the content once the client has loaded ie using
              <code>componentDidMount()</code>
              .
            </p>
            <p>or</p>
            <p>
              <strong>2.</strong>
              If SEO is important you can
              <Clickable
                href="/cloud-rendering"
                as={Link}
                styledAs="a"
                asNextLink
              >
                render the page in the cloud
              </Clickable>
            </p>
          </Flex>
        </Flex>
      </Container>
    );
  }
}
