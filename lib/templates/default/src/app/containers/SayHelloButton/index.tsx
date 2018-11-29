import * as React from 'react'
//
import { CUSTOM_FUNCTION_API } from '@config/apiRoutes'
import { Api } from '@store'
import { subscribe } from '@store/store'
//

interface ISayHelloButtonProps {
  api: {
    request(requestConfig: object, key?: string, take?: string): Promise<{data: string}>,
  }
}

class SayHelloButton extends React.Component<ISayHelloButtonProps> {
  handleClick = () => {
    const { api: { request } } = this.props
    request({
      method: 'get',
      url: CUSTOM_FUNCTION_API,
    }, 'say-hello', 'last')
      .then(response => {
        if (response) {
          /* tslint:disable-next-line */
          console.log(response.data)
        }
        // toastr.light('Firebot', response.data, {
        //   icon: (<img src="/static/next-spa-logo.png" alt="logo" width={40} />),
        //   status: 'warning',
        // })
      })
  }
  render() {
    return (
      <button onClick={this.handleClick}>Say Hello</button>
    )
  }
}

export default subscribe({ api: Api })(SayHelloButton)
