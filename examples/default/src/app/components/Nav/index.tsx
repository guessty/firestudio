import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
import { toastr } from 'react-redux-toastr'
//
import * as Router from '@router'
import StyledNav from './StyledNav'
//

class Nav extends React.Component<any> {
  handleClick = () => {
    toastr.light('Congrats', `You're playing with fire!`, {
      icon: (<img src="/static/firestudio-logo.png" alt="logo" width={40} />),
      status: 'warning',
    })
  }
  render() {
    return (
      <StyledNav>
        <nav className="nav">
          <Flex direction="row" gutter="20px" vAlign="middle">
            <Router.Link to="/">
              <a className="nav__link nav__logo">
                <img src="/static/firestudio-logo.png" alt="logo" width={40} />
              </a>
            </Router.Link>
            <Router.Link to="/about">
              <a className="nav__link">About</a>
            </Router.Link>
            <Router.Link to="/pre-rendering">
              <a className="nav__link">Pre-rendering</a>
            </Router.Link>
            <Router.Link to="/cloud-rendering">
              <a className="nav__link">Cloud Rendering</a>
            </Router.Link>
            <div data-flex-grow={true} />
            <Flex direction="row" gutter="20px" vAlign="middle">
              <button onClick={this.handleClick}>Click me</button>
            </Flex>
          </Flex>
        </nav>
      </StyledNav>
    )
  }
}

export default Nav
