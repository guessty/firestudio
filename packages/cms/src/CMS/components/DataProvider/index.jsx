import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DataProvider extends PureComponent {
  static propTypes = {
    dataKey: PropTypes.string,
    data: PropTypes.node.isRequired,
    _config: PropTypes.shape({
      components: PropTypes.shape({
        Container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      }).isRequired,
      extraProps: PropTypes.shape({}),
    }),
  }

  static defaultProps = {
    dataKey: 'data',
  };

  render() {
    const {
      _config, dataKey, data, ...props
    } = this.props;

    const { components: { Container } } = _config;

    return (
      <Container
        {...props}
        _config={{
          ..._config,
          extraProps: {
            ..._config.extraProps,
            [dataKey]: data,
          },
        }}
      />
    );
  }
}
