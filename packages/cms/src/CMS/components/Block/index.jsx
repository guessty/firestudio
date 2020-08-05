import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { isPlainObject as _isPlainObject } from 'lodash';

import Base from '../Base';
import Editor from './Editor';

export { default as Editor } from './Editor';

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

export default class Block extends PureComponent {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    json: PropTypes.shape({}),
    _config: PropTypes.shape({
      firebase: PropTypes.shape({}).isRequired,
      blocks: PropTypes.shape({}).isRequired,
      editorIsEnabled: PropTypes.bool,
    }).isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    json: undefined,
    render: undefined,
  };

  static COLLECTION_ID = 'blocks';

  static DEFAULT_JSON = {
    component: 'Container',
    children: [],
  };

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

  docRef;

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    json: this.props.json || this.props._config.blocks[this.props.blockId] || Block.DEFAULT_JSON,
  };

  render() {
    const {
      _config: { firebase, editorIsEnabled }, _config,
      json: pJson, blockId, render, ...props
    } = this.props;
    const { json } = this.state;

    if (typeof render === 'function') {
      return render({ json });
    }

    return editorIsEnabled ? (
      <Editor
        blockId={blockId}
        json={json}
        firebase={firebase}
      >
        {({ workingJson }) => (
          <Base {...props} _config={_config} {...workingJson} />
        )}
      </Editor>
    ) : (
      <Base {...props} _config={_config} {...json} />
    );
  }
}
