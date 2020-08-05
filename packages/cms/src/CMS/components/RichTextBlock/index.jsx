
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RichTextEditor from './Editor';
import Block, { Editor } from '../Block';

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

  state = {
    // eslint-disable-next-line react/destructuring-assignment, max-len
    json: this.props.json || this.props._config.blocks[this.props.blockId] || RichTextEditor.DEFAULT_JSON,
  };

  render() {
    const { _config: { firebase, editorIsEnabled }, blockId, className } = this.props;
    const { json: sJson } = this.state;

    return (
      <Block
        {...this.props}
        json={sJson}
        render={({ json }) => (
          <>
            {editorIsEnabled ? (
              <Editor
                json={json}
                firebase={firebase}
                blockId={blockId}
                render={({ setWorkingJson, workingJson }) => (
                  <RichTextEditor
                    json={workingJson}
                    onSetWorkingJson={setWorkingJson}
                  />
                )}
              >
                {({ workingJson }) => (
                  <RichTextEditor.Content className={className} json={workingJson} />
                )}
              </Editor>
            ) : (
              <RichTextEditor.Content className={className} json={sJson} />
            )}
          </>
        )}
      />
    );
  }
}
