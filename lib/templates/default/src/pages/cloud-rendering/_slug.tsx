import * as React from 'react'
//
import Flex from '@components/Flex'

interface IDynamicPageProps {
  query: {
    slug: string,
  }
  isPageLoading: boolean
  PageLoader: any
}

const AltLoader = () => (
  <h2 style={{ padding: '60px 20px', textAlign: 'center', color: 'blue' }}>Loading...</h2>
)

export default class DynamicPage extends React.Component<IDynamicPageProps> {
  static getInitialProps({ query }) {
    return { query }
  }

  render() {
    const { query: { slug }, isPageLoading } = this.props
    console.log(this.props)
    return isPageLoading ? (
      <Flex className="gap-8 gap-around">
        <AltLoader />
      </Flex>
    ) : (
      <Flex className="gap-8 gap-around">
        <Flex className="gap-2">
          <h1>Dynamic Route</h1>
          <p>{slug}</p>
        </Flex>
      </Flex>
    )
  }
}
