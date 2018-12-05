import * as React from 'react'
//
import Link from '@components/Link'
import Flex from '@components/Flex'

export default () => (
  <Flex className="gap-8 gap-around">
    <Flex className="gap-2">
      <h1>Cloud Rendering Pages</h1>
      <strong>Use cloud rendering for pages with dynamic content where SEO is important.</strong>
    </Flex>
    <hr />
    <p>Using Google Cloud Functions, pages can be rendered in the cloud meaning that search
        engines are able to index it and crawl it just as they would with prerendered pages.</p>
    <Flex className="gap-12">
      <Flex className="gap-6">
        <h2>Route Configuration</h2>
        <p>Simply add <code>prerender: false</code> to the route config and Firestudio will handle the rest.</p>
      </Flex>
      <Flex className="gap-6">
        <h2>** Note **</h2>
        <Flex className="gap-4">
          <p>This page is configured to use cloud rendering and once deployed this route will also
              render sub-routes in the cloud.</p>
          <p>Try visiting <Link route="/cloud-rendering/test">/cloud-rendering/test</Link> and observe.</p>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)
