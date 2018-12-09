import * as React from 'react'
import Link from 'next-spa/link'

export default ({ className, ...props }) => (
  <Link {...props} passHref>
    <a className={className || ''}>
      {props.children}
    </a>
  </Link>
)
