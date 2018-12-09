import * as React from 'react'
//
import Link from '@components/Link'
import Flex from '@components/Flex'

const Nav = () => (
  <nav className="nav h-full bg-dark-blue text-white font-semibold">
    <div className="container mx-auto flex h-full px-8">
      <Flex className="flex-row items-center gap-8 gap-between">
        <Link
          to="/" prefetch={true}
          className="flex h-full items-center uppercase text-white font-bold"
          _flexClassName="h-full"
        >
          <span className="mr-4">
            <img src="/static/firestudio-logo.png" alt="logo" width={40} />
          </span>
          <span>Fire<span className="text-blue">Studio</span></span>
        </Link>
        <Link
          to="/about" prefetch={true}
          className="flex h-full items-center"
          _flexClassName="h-full"
        >
          <span>About</span>
        </Link>
        <Link
          to="/pre-rendering" prefetch={true}
          className="flex h-full items-center"
          _flexClassName="h-full"
        >
          <span>Pre-rendering</span>
        </Link>
        <Link to="/cloud-rendering" prefetch={true}
          className="flex h-full items-center"
          _flexClassName="h-full"
        >
          <span>Cloud Rendering</span>
        </Link>
        <Link to="/cloud-functions" prefetch={true}
          className="flex h-full items-center"
          _flexClassName="h-full"
        >
          <span>Cloud Functions</span>
        </Link>
        <div data-flexClassName="flex-grow" />
      </Flex>
    </div>
  </nav>
)

export default Nav

