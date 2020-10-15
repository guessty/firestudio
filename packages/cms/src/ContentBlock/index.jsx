import React from 'react';
import PropTypes from 'prop-types';
import parseUrl from 'url-parse';

import Editor from './Editor'
import * as BLOCK_TYPES from './types';

const defaultRenderer = ({ content, children }) => {
  if (typeof children === 'function') {
    return children({ ...content })
  }

  return children;
};

const ContentBlock = ({
  block,
  db,
  user,
  id,
  type = 'json',
  children,
  disabled = false,
}) => {
  const publishedContent = block?.publishedContent?.json || '{}';

  let isEditing = false;
  const isEditingEnabled = user?.claims.editor || false;

  if (!!db && !!user && isEditingEnabled) {
    const { query: { edit } } = parseUrl(window.location.href, true);
    isEditing = edit === 'true'
  }

  const Block = BLOCK_TYPES[type] || BLOCK_TYPES.json;
  const blockRenderer = Block.renderer || defaultRenderer;

  const publishedJson = JSON.parse(publishedContent);

  return (isEditingEnabled && isEditing && !disabled) ? (
    <Editor
      content={publishedJson}
      db={db}
      blockId={id}
      render={({ setWorkingContent, workingContent }) => (
        <Block
          content={workingContent}
          onSetWorkingContent={setWorkingContent}
        />
      )}
    >
      {(workingContent) => blockRenderer({ content: workingContent, children })}
    </Editor>
  ) : blockRenderer({ content: publishedContent, children });
};

ContentBlock.propTypes = {
  block: PropTypes.shape({
    publishedContent: PropTypes.shape({}).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ContentBlock;
