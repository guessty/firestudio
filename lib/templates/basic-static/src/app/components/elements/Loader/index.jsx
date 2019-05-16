import React from 'react';

export default class Loader extends React.PureComponent {
  static defaultProps = {
    className: '',
  }

  render() {
    const { invert, className } = this.props;

    return (
      <h2
        className={`w-full ${invert ? 'text-white' : 'text-blue-darker mt-8'} text-center ${className}`}
      >
        Loading...
      </h2>
    );
  }
}
