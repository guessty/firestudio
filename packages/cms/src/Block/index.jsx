import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firepress/core/router';
import parseUrl from 'url-parse';
import { isPlainObject as _isPlainObject } from 'lodash';

import JsonBlock from './blocks/JsonBlock';
import RichTextBlock from './blocks/RichTextBlock';
import DataGridBlock from './blocks/DataGridBlock';

export const getBlockById = async (firebase, blockId, isDraftMode) => {
  try {
    const db = firebase.firestore();
    const docRef = db.collection('blocks').doc(blockId);
    const doc = await docRef.get();
    if (!doc.exists) return null;
    const docData = doc.data();
    const contentId = isDraftMode ? docData.draftContentId : docData.publishedContentId;
    if (!contentId) return null;
    const contentRef = docRef.collection('content').doc(contentId);
    const contentDoc = await contentRef.get();
    if (!contentDoc.exists) return null;

    const contentDocData = contentDoc.data();

    return {
      content: contentDocData || null,
      ...isDraftMode ? { draftContentId: contentId } : {},
    };
  } catch {
    return null;
  }
};

export default class Block extends Component {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    blockType: PropTypes.string.isRequired,
    blockComponents: PropTypes.shape({}),
    blocks: PropTypes.shape({}),
    firebase: PropTypes.shape({}),
    children: PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.node,
    ]),
  };

  static defaultProps = {
    blockComponents: {},
    blocks: {},
    firebase: undefined,
    children: undefined,
  };

  static BLOCK_COMPONENTS = {
    DataGrid: DataGridBlock,
    Json: JsonBlock,
    RichText: RichTextBlock,
  }

  static DEFAULT_CONTENT = {};

  static getNestedBlocks = async (firebase, content) => {
    const findBlocks = async (nFirebase, nContent) => {
      let foundBlocks = {};
      if (_isPlainObject(nContent)) {
        if (nContent.blockId) {
          if (typeof foundBlocks[nContent.blockId] === 'undefined') {
            const { content: blockContent = null } = await getBlockById(nFirebase, nContent.blockId) || {};
            foundBlocks = {
              ...foundBlocks,
              [nContent.blockId]: blockContent,
            };
            const nFoundBlocks = await findBlocks(nFirebase, blockContent);
            foundBlocks = {
              ...foundBlocks,
              ...nFoundBlocks,
            };
          }
        }
        if (nContent.children) {
          const childArray = Array.isArray(nContent.children) ? nContent.children : [nContent.children];
          await Promise.all(childArray.map(async (child) => {
            const cFoundBlocks = await findBlocks(nFirebase, child);

            foundBlocks = {
              ...foundBlocks,
              ...cFoundBlocks,
            };

            return cFoundBlocks;
          }));
        }
      }

      return foundBlocks;
    };

    const blocks = await findBlocks(firebase, content);

    return blocks;
  };

  static getPublishedBlock = async (firebase, blockContentId) => {
    const { content = null } = await getBlockById(firebase, blockContentId) || {};
    const blocks = await Block.getNestedBlocks(firebase, content);

    return { content, blocks };
  };

  static getBlocks = async (firebase, blockIds) => {
    const blocksArray = await Promise.all(blockIds.map(async (blockId) => {
      const { content = null } = await getBlockById(firebase, blockId) || {};
      const nestedBlocks = await Block.getNestedBlocks(firebase, content);

      return {
        [blockId]: content,
        ...nestedBlocks,
      };
    }));

    const blocks = blocksArray.reduce((acc, item) => ({
      ...acc,
      ...item,
    }));

    return blocks;
  }

  state = {
    editorIsEnabled: false,
    mode: 'default',
  };

  async componentDidMount() {
    const { firebase } = this.props;
    setTimeout(() => {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
        this.checkAndEnableEditor(user);
      });
    }, 0);
    Router.router.events.on('routeChangeComplete', this.handleRouteChange);
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
    Router.router.events.off('routeChangeComplete', this.handleRouteChange);
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

  handleRouteChange = () => {
    const { editorIsEnabled } = this.state;

    if (editorIsEnabled) {
      const { query: { fpmode = 'default' } } = parseUrl(Router.router.asPath, true);
      this.setState({ mode: fpmode });
    }
  }

  render() {
    const {
      blockId, blockType, blocks, children,
      blockComponents, firebase,
    } = this.props;
    const { editorIsEnabled, mode } = this.state;

    const _config = {
      blocks,
      ...firebase ? { firebase } : {},
      editorIsEnabled,
    };

    const BLOCKS = {
      ...blockComponents,
      ...Block.BLOCK_COMPONENTS,
    };

    const BlockComponent = BLOCKS[blockType] || Block.BLOCK_COMPONENTS.Json;

    return (
      <BlockComponent
        key={`${blockId}_${mode}`}
        blockId={blockId}
        content={blocks[blockId] || Block.DEFAULT_CONTENT}
        _config={_config}
        children={children} // eslint-disable-line react/no-children-prop
      />
    );
  }
}
