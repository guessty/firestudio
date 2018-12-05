import * as React from 'react'
//
import Link from '@components/Link'
import Flex from '@components/Flex'

export default () => (
  <Flex className="gap-8 gap-around">
    <h1>About</h1>
    <hr />
    <p>Firestudio was created with the aim of providing a "zero-config" solution to
        developing web applications with ReactJS and hosting them on Google Firebase.</p>
    <Flex className="gap-12">
      <Flex className="gap-6">
        <h2>What's in the box?</h2>
        <Flex className="gap-4">
          <ol>
            <li><strong>TypeScript Support</strong> - Write your app in TypeScript,
              ES6 or Vanilla JS - no configuration needed.</li>
            <li><strong>Linting Support</strong> - Linting is configured and ready to go.</li>
            <li><strong>Static Hosting</strong> - See <Link to="/pre-rendering">
              <a>pre-rendering</a>
            </Link></li>
            <li><strong>Cloud Functions</strong> - Extend your app further by using Google Cloud Functions.</li>
            <li><strong>React and Redux</strong> - All the state management you could need.</li>
            <li><strong>Styled Components</strong> - CSS-in-JS awesomeness.</li>
          </ol>
        </Flex>
      </Flex>
      <Flex className="gap-6">
        <h2>Credit where credit is due</h2>
        <Flex className="gap-4">
          <p>At its core Firestudio is essentially a re-packaged NextJS application
              that has been configured to work with Google's Firebase platform.</p>
          <p>So big thanks go out to the teams behind NextJS and Firebase for creating
              such awesome products!</p>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
)
