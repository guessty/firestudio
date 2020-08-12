import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Editor from './Editor';
import Renderer from './components/Renderer';

export { default as Editor } from './Editor';
export { default as Renderer } from './components/Renderer';
export { default as Container } from './components/Container';
export { default as DataProvider } from './components/DataProvider';


export default class JsonBlock extends PureComponent {
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

  docRef;

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    json: this.props.json || this.props._config.blocks[this.props.blockId] || JsonBlock.DEFAULT_JSON,
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
          <Renderer {...props} _config={_config} {...workingJson} />
        )}
      </Editor>
    ) : (
      <Renderer {...props} _config={_config} {...json} />
    );
  }
}
