import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
//
import StyledFooter from './StyledFooter'
//

const Footer = () => (
  <StyledFooter>
    <footer>
      <Flex gutter="20px" incGutterEdges={true} vAlign="middle" hAlign="center">
        <h4>Firestudio</h4>
      </Flex>
    </footer>
  </StyledFooter>
)

export default Footer
