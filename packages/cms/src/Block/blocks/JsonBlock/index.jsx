import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EditorContent from './EditorContent';
import Editor from '../../Editor';

export default class JsonBlock extends PureComponent {
  static propTypes = {
    _config: PropTypes.shape({
      firebase: PropTypes.shape({}).isRequired,
      blocks: PropTypes.shape({}).isRequired,
    }).isRequired,
    blockId: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.func,
    ]).isRequired,
  };

  static defaultProps = {
    children: [],
  };

  renderChildren(content) {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children({ ...content })
    }

    return children;
  }

  render() {
    const {
      _config: { firebase, editorIsEnabled, blocks },
      blockId,
    } = this.props;
    const content = blocks[blockId] || {};
    
    return editorIsEnabled ? (
      <Editor
        blockId={blockId}
        content={content}
        firebase={firebase}
        render={({ setWorkingContent, workingContent }) => (
          <EditorContent
            content={workingContent}
            onSetWorkingContent={setWorkingContent}
          />
        )}
      >
        {({ workingContent }) => this.renderChildren(workingContent)}
      </Editor>
    ) : this.renderChildren(content);
  }
}
