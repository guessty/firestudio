import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import Link from '@components/Link'
import Flex from '@components/Flex'

export default () => (
  <Flex className="gap-8 gap-around">
    <Flex className="gap-2">
      <h1>Firestudio</h1>
      <strong>Get ready to play with fire! <FontAwesomeIcon icon={['far', 'grin-tongue-squint']} /></strong>
    </Flex>
    <hr />
    <h2>Develop and host web apps without the configuration.</h2>
    <Link to="/about">Find out more!</Link>
  </Flex>
)
