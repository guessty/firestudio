
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

    const json = blocks[blockId] || EditorContent.DEFAULT_JSON

    return editorIsEnabled ? (
      <Editor
        json={json}
        firebase={firebase}
        blockId={blockId}
        render={({ setWorkingJson, workingJson }) => (
          <EditorContent
            json={workingJson}
            onSetWorkingJson={setWorkingJson}
          />
        )}
      >
        {({ workingJson }) => (
          <EditorContent.Content className={className} json={workingJson} />
        )}
      </Editor>
    ) : (
      <EditorContent.Content className={className} json={sJson} />
    );
  }
}
