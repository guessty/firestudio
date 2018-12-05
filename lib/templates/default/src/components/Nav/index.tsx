import * as React from 'react'
//
import Link from '@components/Link'
import Flex from '@components/Flex'
import StyledNav from './StyledNav'
//

const Nav = () => (
  <StyledNav>
    <nav className="nav flex h-full px-8 border-b border-border-grey">
      <Flex className="flex-row items-center gap-8 gap-between">
        <Link to="/" prefetch={true} className="nav__link nav__logo">
            <img src="/static/firestudio-logo.png" alt="logo" width={40} />
        </Link>
        <Link to="/about" prefetch={true} className="nav__link">About</Link>
        <Link to="/pre-rendering" prefetch={true} className="nav__link">Pre-rendering</Link>
        <Link to="/cloud-rendering" prefetch={true} className="nav__link">Cloud Rendering</Link>
        <Link to="/cloud-functions" prefetch={true} className="nav__link">Cloud Functions</Link>
        <div data-flex-grow={true} />
      </Flex>
    </nav>
  </StyledNav>
)

export default Nav
