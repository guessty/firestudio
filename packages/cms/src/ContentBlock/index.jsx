import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '@firepress/ui';

import useSessionStorage from '../hooks/useSessionStorage';

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
  editorConfig = {},
}) => {
  const publishedContent = block?.publishedContent?.json || '{}';
  const publishedJson = JSON.parse(publishedContent);
  const isEditingEnabled = user?.claims.editor || false;

  const Block = BLOCK_TYPES[type] || BLOCK_TYPES.json;
  const blockRenderer = Block.renderer || defaultRenderer;

  if (!isEditingEnabled || disabled) return blockRenderer({ content: publishedJson, children });

  const [mode] = useSessionStorage('mode');
  const isEditing = mode === 'edit';
  const isPreviewing = mode === 'preview';

  return (isEditing || isPreviewing) ? (
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
        isPreviewing={isPreviewing}
        render={({ setWorkingContent, workingContent }) => (
          <Block
            content={workingContent}
            config={editorConfig}
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
