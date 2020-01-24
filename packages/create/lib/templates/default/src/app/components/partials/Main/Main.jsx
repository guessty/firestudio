import React, { PureComponent } from 'react';

export default class Main extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <main className="flex flex-col w-full flex-grow">
        {children}
      </main>
    );
  }
}
