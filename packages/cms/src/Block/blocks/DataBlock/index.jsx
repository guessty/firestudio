import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DataEditor from './Editor';
import JsonBlock, { Editor, Renderer } from '../JsonBlock';

export default class DataBlock extends PureComponent {
  static propTypes = {
    _config: PropTypes.shape({
      firebase: PropTypes.shape({}).isRequired,
      blocks: PropTypes.shape({}).isRequired,
      components: PropTypes.shape({
        Container: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      }).isRequired,
      extraProps: PropTypes.shape({}).isRequired,
    }).isRequired,
    blockId: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    className: '',
    children: [],
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment, max-len
    json: this.props._config.blocks[this.props.blockId] || {},
  };

  renderChildren(props, _config, json) {
    const { children } = this.props;

    if (typeof children === 'function') {
      return children({ ...props, _config, ...json })
    }

    return children;
  }

  render() {
    const {
      _config: { firebase, editorIsEnabled },
      _config, blockId, children, ...props
    } = this.props;
    const { json: sJson } = this.state;

    const updatedConfig = {
      ..._config,
      extraProps: {
        ..._config.extraProps,
        data: sJson?.data,
      },
    }
    
    return (
      <JsonBlock
        {...this.props}
        blockId={blockId}
        _config={updatedConfig}
        json={sJson}
        render={({ json }) => (
          <>
            {editorIsEnabled ? (
              <Editor
                blockId={blockId}
                json={json}
                firebase={firebase}
                render={({ setWorkingJson, workingJson }) => (
                  <DataEditor
                    json={workingJson}
                    onSetWorkingJson={setWorkingJson}
                  />
                )}
              >
                {({ workingJson }) => this.renderChildren({
                  ...props, _config: updatedConfig, ...workingJson,
                })}
              </Editor>
            ) : this.renderChildren({
              ...props, _config: updatedConfig, ...json,
            })}
          </>
        )}
      />
    );
  }
}
