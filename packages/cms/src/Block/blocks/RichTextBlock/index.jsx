
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EditorContent from './EditorContent';
import Editor from '../../Editor';

export default class RichTextBlock extends PureComponent {
  static propTypes = {
    _config: PropTypes.shape({
      firebase: PropTypes.shape({}).isRequired,
      blocks: PropTypes.shape({}).isRequired,
    }).isRequired,
    blockId: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const {
      _config: { firebase, editorIsEnabled, blocks },
      blockId, className,
    } = this.props;

    const content = blocks[blockId] || EditorContent.DEFAULT_CONTENT;

    return editorIsEnabled ? (
      <Editor
        content={content}
        firebase={firebase}
        blockId={blockId}
        render={({ setWorkingContent, workingContent }) => (
          <EditorContent
            content={workingContent}
            onSetWorkingContent={setWorkingContent}
          />
        )}
      >
        {({ workingContent }) => (
          <EditorContent.Content className={className} content={workingContent} />
        )}
      </Editor>
    ) : (
      <EditorContent.Content className={className} content={content} />
    );
  }
}
