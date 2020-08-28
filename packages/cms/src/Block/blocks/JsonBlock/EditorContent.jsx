import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const ReactJsonView = dynamic(() => import('react-json-view'), { ssr: false });

export default class EditorContent extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({}),
    onSetWorkingContent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content: {},
  };

  handleOnUpdate = ({ updated_src: workingContent }) => {
    const { onSetWorkingContent } = this.props;
    onSetWorkingContent(workingContent);

    return workingContent;
  };

  render() {
    const { content } = this.props;

    return (
      <div
        className="flex flex-col flex-grow overflow-auto py-5"
        style={{
          backgroundColor: 'rgb(39, 40, 34)',
        }}
      >
        <ReactJsonView
          src={content}
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
