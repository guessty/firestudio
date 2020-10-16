import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import parseUrl from 'url-parse';
import { Loader } from '@firepress/ui';

import * as BLOCK_TYPES from './types';

const Editor = React.lazy(() => import('./Editor'));

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
  const publishedJson = JSON.parse(publishedContent);
  const isEditingEnabled = user?.claims.editor || false;

  const Block = BLOCK_TYPES[type] || BLOCK_TYPES.json;
  const blockRenderer = Block.renderer || defaultRenderer;

  if (!isEditingEnabled || disabled) return blockRenderer({ content: publishedJson, children });

  const { query: { edit } } = parseUrl(window.location.href, true);
  const isEditing = edit === 'true';

  return (isEditing) ? (
    <Suspense
      fallback={(
        <div className="fp-cms__editor__loader-container">
          <Loader className="fp-cms__editor__loader" />
        </div>
      )}
    >
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
    </Suspense>
  ) : blockRenderer({ content: publishedJson, children });
};

ContentBlock.propTypes = {
  block: PropTypes.shape({
    publishedContent: PropTypes.shape({}).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ContentBlock;
