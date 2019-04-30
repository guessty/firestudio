import React, { PureComponent } from 'react';

export default class Avatar extends PureComponent {
  render() {
    const { user, className } = this.props;

    return (
      <div
        className={`flex w-10 h-10 justify-center items-center text-lg rounded ${className}`}
        style={{
          background: user.picture ? `url(${user.picture}) 50%/cover no-repeat` : '',
        }}
      >
        {!user.picture ? (<span>{user.name ? user.name.charAt(0) : ':)'}</span>) : null}
      </div>
    );
  }
}
