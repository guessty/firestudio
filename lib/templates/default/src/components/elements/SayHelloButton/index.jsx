import React, { Component } from 'react';
//
import Clickable from '@atoms/Clickable';
import { CUSTOM_FUNCTION_API } from '@config/apiRoutes';
import { Api } from '@store';
import { subscribe } from '@store/store';
//

class SayHelloButton extends Component {
  handleClick = () => {
    const { api: { request } } = this.props;
    request({
      method: 'get',
      url: CUSTOM_FUNCTION_API,
    }, 'say-hello', 'last')
      .then((response) => {
        if (response) {
          /* tslint:disable-next-line */
          console.log(response.data);
        }
        // toastr.light('Firebot', response.data, {
        //   icon: (<img src="/static/next-spa-logo.png" alt="logo" width={40} />),
        //   status: 'warning',
      });
  }

  render() {
    return (
      <Clickable
        onClick={this.handleClick}
      >
        Say Hello
      </Clickable>
    );
  }
}

export default subscribe({ api: Api })(SayHelloButton);
