import React from 'react';
import PropTypes from 'prop-types';
import ReactJsonView from 'react-json-view';

const JsonBlock = ({ content, onSetWorkingContent }) => {
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
      <ReactJsonView
        src={content}
        theme="monokai"
        shouldCollapse={({ type }) => type === 'array'}
        onAdd={handleUpdate}
        onDelete={handleUpdate}
        onEdit={handleUpdate}
      />
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
