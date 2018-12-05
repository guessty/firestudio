import * as React from 'react'
import Link from 'next-spa/link'

export default (props) => (
  <Link {...props} passHref>
    <a className={props.className || ''}>
      {props.children}
    </a>
  </Link>
)
