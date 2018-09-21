import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
//
import AppLayout from '@layouts/App'
//

interface IDynamicPageProps {
  slug: string
}

class DynamicPage extends React.Component<IDynamicPageProps> {
  static async getInitialProps({ query }) {
    return {
      slug: query.slug,
    }
  }
  render() {
    const { slug } = this.props
    return (
      <AppLayout>
        <Flex gutter="2rem">
          <Flex gutter="0.5rem">
            <h1>Cloud Rendering Pages</h1>
            <strong>Use cloud rendering for pages with dynamic content where SEO is important.</strong>
          </Flex>
          <hr />
          <p>Using Google Cloud Functions, pages can be rendered in the cloud meaning that search engines are able to index it and crawl it just as they would with prerendered pages.</p>
          <Flex gutter="3rem">
            <Flex gutter="1.5rem">
              <h2>Route Configuration</h2>
              <p>Simply add <code>prerender: false</code> to the route config and Firestudio will handle the rest.</p>
            </Flex>
            <Flex gutter="1.5rem">
              <h2>** Note **</h2>
              <Flex gutter="1rem">
                <p>This page is configured to use cloud rendering and once deployed this route will also render sub-routes in the cloud.</p>
                <p>Try visiting <a href="/cloud-rendered-pages/test">/cloud-rendered-pages/test</a> and observe.</p>
              </Flex>
              {slug ? (
                <strong>Now viewing subroute - {slug}</strong>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </AppLayout>
    )
  }
}

export default DynamicPage
