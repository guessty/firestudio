import * as React from 'react'
import { Grid } from 'react-grid-flexbox'
//
import Flex from '@components/Flex'
import Nav from '@components/Nav'
import Footer from '@components/Footer'

interface IAppLayoutProps {
  children?: React.ReactNode
}

const AppLayout = (props: IAppLayoutProps) => (
  <Grid
    templateRows="5rem minmax(calc(100vh - 5rem), auto) auto"
    templateAreas={`
      "nav"
      "main"
      "footer"
    `}
  >
    <Nav data-grid-area="nav" />
    <Flex data-grid-area="main" className="">
      {props.children}
    </Flex>
    <Footer data-grid-area="footer" />
  </Grid>
)

export default AppLayout
