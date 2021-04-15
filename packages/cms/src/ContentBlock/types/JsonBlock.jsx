import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

const ReactJsonView = React.lazy(() => import('react-json-view'));

const JsonBlock = ({ content, onSetWorkingContent, config = {} }) => {
  const handleUpdate = ({ updated_src: workingContent }) => {
    onSetWorkingContent(workingContent);

    return workingContent;
  };

  return (
    <div
      className="fp-cms__json-editor"
      style={{
        backgroundColor: 'rgb(39, 40, 34)',
      }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ReactJsonView
          shouldCollapse={() => true}
          groupArraysAfterLength={50}
          {...config}
          src={content}
          theme="monokai"
          onAdd={handleUpdate}
          onDelete={handleUpdate}
          onEdit={handleUpdate}
        />
      </Suspense>
    </div>
  );
};

JsonBlock.renderer = ({ content, children }) => {
  if (typeof children === 'function') {
    return children({ ...content })
  }

  return children;
}

export default JsonBlock;
