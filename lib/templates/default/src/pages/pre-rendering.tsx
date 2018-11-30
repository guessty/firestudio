import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
import Link from 'next-spa/link'
//

export default () => (
  <Flex gutter="2rem">
    <Flex gutter="0.5rem">
      <h1>Pre-rendering Pages</h1>
      <strong>Pages are exported to HTML for cost-effective hosting.</strong>
    </Flex>
    <hr />
    <Flex gutter="1rem">
      <p>Firestudio is configured by default to export/prerender all of the pages to
          HTML so that they can be hosted through Firebase Hosting.</p>
      <p>This keeps the hosting costs of your application as low as possible.</p>
    </Flex>
    <h2>Pages with Dynamic Content</h2>
    <Flex gutter="1rem">
      <p>For handling pages with dynamic content you have 2 options:</p>
      <p><strong>1.</strong> Fetch the content once the client has loaded
        ie using <code>componentDidMount()</code>.</p>
      <p>or</p>
      <p><strong>2.</strong> If SEO is important you can <Link to="/cloud-rendering">
        <a>render the page in the cloud</a>
      </Link></p>
    </Flex>
  </Flex>
)
