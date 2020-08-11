import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DataProvider extends PureComponent {
  static propTypes = {
    dataKey: PropTypes.string.isRequired,
    dataValue: PropTypes.shape().isRequired,
    _config: PropTypes.shape({
      components: PropTypes.shape({
        Container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      }).isRequired,
      extraProps: PropTypes.shape({}),
    }),
  }

  render() {
    const {
      _config, dataKey, dataValue, ...props
    } = this.props;

    const { components: { Container } } = _config;

    return (
      <Container
        {...props}
        _config={{
          ..._config,
          extraProps: {
            ..._config.extraProps,
            [dataKey]: dataValue,
          },
        }}
      />
    );
  }
}
