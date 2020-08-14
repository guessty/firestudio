import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const ReactJsonView = dynamic(() => import('react-json-view'), { ssr: false });

export default class RichTextEditor extends PureComponent {
  static propTypes = {
    json: PropTypes.shape({}),
    onSetWorkingJson: PropTypes.func.isRequired,
  };

  static defaultProps = {
    json: {},
  };

  handleOnUpdate = ({ updated_src: workingJson }) => {
    onSetWorkingJson(workingJson)

    return workingJson;
  };

  render() {
    const { json } = this.props;

    return (
      <div
        className="flex flex-col flex-grow overflow-auto py-5"
        style={{
          backgroundColor: 'rgb(39, 40, 34)',
        }}
      >
        <ReactJsonView
          src={json}
          theme="monokai"
          shouldCollapse={({ type }) => type === 'array'}
          onAdd={this.handleOnUpdate}
          onDelete={this.handleOnUpdate}
          onEdit={this.handleOnUpdate}
        />
      </div>
    );
  }
}
