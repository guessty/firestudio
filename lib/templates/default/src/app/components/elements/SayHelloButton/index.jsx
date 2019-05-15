import React, { Component } from 'react';
import { Clickable } from 'firestudio-ui';
//
import { Api } from '@store/containers';
import { subscribe } from '@store';
//

class SayHelloButton extends Component {
  handleClick = () => {
    const { api: { request } } = this.props;
    request({
      method: 'post',
      url: Api.ROUTES.HELLO,
    }, 'hello', 'last')
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
