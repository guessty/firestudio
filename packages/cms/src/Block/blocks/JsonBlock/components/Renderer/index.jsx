import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty as _isEmpty } from 'lodash';
import Router from '@firepress/core/router';

import { parseProps, canComponentRender } from './helpers';
import valueParser from './parser';
import { ConditionalPropType } from './PropTypes';

class Renderer extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.node,
    ]),
    component: PropTypes.string,
    connectedProps: PropTypes.shape({}),
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    useProps: PropTypes.arrayOf(PropTypes.string),
    renderCondition: PropTypes.arrayOf(PropTypes.oneOfType([
      ConditionalPropType,
      PropTypes.arrayOf(ConditionalPropType),
    ])),
    _config: PropTypes.shape({
      dataParsers: PropTypes.shape({}),
      components: PropTypes.shape({}),
      extraProps: PropTypes.shape({}),
      globalProps: PropTypes.shape({}),
      parserOptions: PropTypes.shape({
        methods: PropTypes.shape({}),
        isMethodValidFnc: PropTypes.func,
      })
    }),
  };

  static defaultProps = {
    component: "Container",
    children: undefined,
    className: '',
    wrapperClassName: '',
    connectedProps: {},
    useProps: [],
    renderCondition: undefined,
    _config: {
      dataParsers: {},
      components: {},
      extraProps: {},
      globalProps: {},
      parserOptions: {
        methods: {},
      }
    },
  };

  static getDerivedStateFromProps(props, state) {
    const { useProps, _config: { extraProps, globalProps } } = props;
    const { updatedQueryParams } = state;

    const AVAILABLE_PROPS = {
      ...extraProps,
      ...globalProps,
      queryParams: {
        ...Router.currentRoute ? Router.currentRoute.query : {},
        ...updatedQueryParams,
      },
    };

    const connectedProps = useProps.reduce((acc, propKey) => ({
      ...acc,
      [propKey]: AVAILABLE_PROPS[propKey],
    }), {});

    return {
      connectedProps,
    };
  }

  state = {
    connectedProps: {},
    updatedQueryParams: {},
  };

  componentDidMount() {
    window.addEventListener('onupdatequeryparams', this.updateQueryParams);
  }

  shouldComponentUpdate(_nextProps, nextState) {
    const { connectedProps, updatedQueryParams } = this.state;
    const { connectedProps: nConnectedProps, updatedQueryParams: nUpdatedQueryParams } = nextState;

    if (_isEmpty(connectedProps)) return true;

    if (JSON.stringify(connectedProps) !== JSON.stringify(nConnectedProps)) return true;
    if (JSON.stringify(updatedQueryParams) !== JSON.stringify(nUpdatedQueryParams)) return true;

    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('onupdatequeryparams', this.updateQueryParams);
  }

  updateQueryParams = (e) => {
    const {
      url, as, options, ...updatedQueryParams
    } = e.detail;

    this.setState({
      updatedQueryParams,
    });
  };

  parseProps(propsValue) {
    const { _config: { parserOptions } } = this.props;
    const { connectedProps } = this.state;

    const parser = (originalValue, parsingSteps) => valueParser(
      originalValue, parsingSteps, parserOptions.methods, parserOptions.isMethodValidFnc,
    );

    return parseProps(propsValue, connectedProps, parser);
  }

  render() {
    const {
      children, className, wrapperClassName,
      component, connectedProps: cProps,
      useProps, renderCondition, _config,
      ...props
    } = this.props;
    const { connectedProps } = this.state;

    const LIBRARY_COMPONENTS = {
      ..._config.components || {},
    };

    const LibraryComponent = LIBRARY_COMPONENTS[component];
    if (!LibraryComponent) {
      // eslint-disable-next-line no-console
      console.error(`The component "${component}" does not exist in the library.`);

      return null;
    }

    const parsedProps = this.parseProps(props);
    const parsedRenderCondition = this.parseProps(renderCondition);

    return canComponentRender(parsedRenderCondition) ? (
      <div
        className={`
          flex flex-col ${(className || '').includes('flex-grow') ? 'flex-grow' : ''}
          ${wrapperClassName}
        `}
      >
        <LibraryComponent
          {...parsedProps}
          children={children} // eslint-disable-line react/no-children-prop
          _config={_config}
          className={className}
          connectedProps={connectedProps}
        />
      </div>
    ) : null;
  }
}

export default Renderer;
