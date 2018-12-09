import * as React from 'react'
//
import Link from '@components/Link'
import Flex from '@components/Flex'
//

const Footer = () => (
  <footer className="h-full bg-dark-blue text-white">
    <div className="container mx-auto flex h-full px-8">
      <Flex className="gap-8 gap-around justify-center items-center">
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
      </Flex>
    </div>
  </footer>
)

export default Footer
