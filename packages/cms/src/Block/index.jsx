import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firepress/core/router';
import parseUrl from 'url-parse';
import { isPlainObject as _isPlainObject } from 'lodash';

import JsonBlock from './blocks/JsonBlock';
import RichTextBlock from './blocks/RichTextBlock';
import DataBlock from './blocks/DataBlock';

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
      json: contentDocData.json || null,
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
    Data: DataBlock,
    Json: JsonBlock,
    RichText: RichTextBlock,
  }

  static DEFAULT_JSON = {};

  static getNestedBlocks = async (firebase, json) => {
    const findBlocks = async (nFirebase, nJson) => {
      let foundBlocks = {};
      if (_isPlainObject(nJson)) {
        if (nJson.blockId) {
          if (typeof foundBlocks[nJson.blockId] === 'undefined') {
            const { json: blockJson = null } = (
              await getBlockById(nFirebase, nJson.blockId) || {});
            foundBlocks = {
              ...foundBlocks,
              [nJson.blockId]: blockJson,
            };
            const nFoundBlocks = await findBlocks(nFirebase, blockJson);
            foundBlocks = {
              ...foundBlocks,
              ...nFoundBlocks,
            };
          }
        }
        if (nJson.children) {
          const childArray = Array.isArray(nJson.children) ? nJson.children : [nJson.children];
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

    const blocks = await findBlocks(firebase, json);

    return blocks;
  };

  static getPublishedBlock = async (firebase, blockContentId) => {
    const { json = null } = await getBlockById(firebase, blockContentId) || {};
    const blocks = await Block.getNestedBlocks(firebase, json);

    return { json, blocks };
  };

  static getBlocks = async (firebase, blockIds) => {
    const blocksArray = await Promise.all(blockIds.map(async (blockId) => {
      const { json = null } = await getBlockById(firebase, blockId) || {};
      const nestedBlocks = await Block.getNestedBlocks(firebase, json);

      return {
        [blockId]: json,
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
      blockId, blockType, blocks, children,
      blockComponents, firebase,
    } = this.props;
    const { editorIsEnabled } = this.state;

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
        key={blockId}
        blockId={blockId}
        json={blocks[blockId] || DEFAULT_JSON}
        _config={_config}
        children={children} // eslint-disable-line react/no-children-prop
      />
    );
  }
}
