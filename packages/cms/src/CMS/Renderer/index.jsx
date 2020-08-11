import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firepress/core/router';
import parseUrl from 'url-parse';

import Block from '../components/Block';
import RichTextBlock from '../components/RichTextBlock';
import Container from '../components/Container';

export default class Renderer extends Component {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    components: PropTypes.shape({}),
    blocks: PropTypes.shape({}),
    firebase: PropTypes.shape({}),
    globalProps: PropTypes.shape({}),
    Loader: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    json: PropTypes.shape({}),
  };

  static defaultProps = {
    components: {},
    blocks: {},
    firebase: undefined,
    globalProps: {},
    Loader: undefined,
    json: null,
  };

  static COMPONENTS = {
    Container,
    RichTextBlock,
  };

  static DEFAULT_JSON = {
    component: 'Container',
    children: [],
  };

  state = {
    editorIsEnabled: false,
  };

  async componentDidMount() {
    const { firebase } = this.props;
    setTimeout(() => {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
        this.checkAndEnableEditor(user);
      });
    }, 0);
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  checkAndEnableEditor = async (user) => {
    const { blockId } = this.props;
    const { query: { fpmode } } = parseUrl(Router.router.asPath, true);
    const isEditing = fpmode === 'edit';
    const isPreviewing = fpmode === 'preview';
    if (blockId && user && (isEditing || isPreviewing)) {
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.editor) {
        this.setState({ editorIsEnabled: true });
      }
    }
  };

  render() {
    const {
      blocks, components, firebase, globalProps, Loader, json, blockId,
    } = this.props;
    const { editorIsEnabled } = this.state;

    const _config = {
      blocks,
      components: {
        ...Renderer.COMPONENTS,
        ...components,
        Block,
      },
      ...firebase ? { firebase } : {},
      editorIsEnabled,
      globalProps,
      Loader,
    };

    return (
      <Block
        key={blockId}
        blockId={blockId}
        json={json || Renderer.DEFAULT_JSON}
        _config={_config}
      />
    );
  }
}
