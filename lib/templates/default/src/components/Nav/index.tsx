import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
import Link from 'next-spa/link'
//
// import Routes from '@routes'
import StyledNav from './StyledNav'
//

const Nav = () => (
  <StyledNav>
    <nav className="nav">
      <Flex direction="row" gutter="20px" vAlign="middle">
        <Link to="/" prefetch={true}>
          <a className="nav__link nav__logo">
            <img src="/static/firestudio-logo.png" alt="logo" width={40} />
          </a>
        </Link>
        <Link to="/about" prefetch={true}>
          <a className="nav__link">About</a>
        </Link>
        <Link to="/pre-rendering" prefetch={true}>
          <a className="nav__link">Pre-rendering</a>
        </Link>
        <Link to="/cloud-rendering" prefetch={true}>
          <a className="nav__link">Cloud Rendering</a>
        </Link>
        <Link to="/cloud-functions" prefetch={true}>
          <a className="nav__link">Cloud Functions</a>
        </Link>
        <div data-flex-grow={true} />
      </Flex>
    </nav>
  </StyledNav>
)

export default Nav
