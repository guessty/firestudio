import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Router from '@firepress/core/router';
import { Clickable, Loader } from '@firepress/ui';
import Dock from 'react-dock';
import WindowSize from '@reach/window-size';
import parseUrl from 'url-parse';

import { getBlockById } from '../../../index';

const ReactJsonView = dynamic(() => import('react-json-view'), { ssr: false });

export default class Editor extends Component {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    firebase: PropTypes.shape({}).isRequired,
    json: PropTypes.shape({}),
    buttonPosition: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.func.isRequired,
    render: PropTypes.func,
  };

  static defaultProps = {
    buttonPosition: 'right',
    json: {},
    render: undefined,
  };

  static getDraftBlock = async (firebase, blockId) => {
    const { json, draftContentId } = await getBlockById(firebase, blockId, true) || {};

    return { json, draftContentId, blocks: {} };
  };

  static LOADER = () => (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Loader className="text-orange-500" />
    </div>
  );

  docRef;

  state = {
    isLoading: false,
    isPreviewing: false,
    // eslint-disable-next-line react/destructuring-assignment
    workingJson: this.props.json,
    // eslint-disable-next-line react/destructuring-assignment
    savedJson: this.props.json,
    hasEdits: false,
    isOpen: false,
    draftContentId: undefined,
  };

  async componentDidMount() {
    const { firebase, blockId } = this.props;
    const { query: { fpmode } } = parseUrl(Router.router.asPath, true);
    const isPreviewing = fpmode === 'preview';
    setTimeout(() => {
      const db = firebase.firestore();
      this.docRef = db.collection('blocks').doc(blockId);
      this.setState({
        isLoading: true,
        isPreviewing,
      }, async () => {
        const { json, draftContentId } = await Editor.getDraftBlock(firebase, blockId);
        if (draftContentId) {
          this.setState({ workingJson: json, draftContentId });
        }
        this.setState({ isLoading: false });
      });
    }, 0);
  }

  handleOnClickActionButton = () => {
    const { hasEdits } = this.state;
    if (hasEdits) {
      this.saveJson();
    } else {
      this.publishJson();
    }
  };

  handleOnUpdate = ({ updated_src: workingJson }) => {
    this.setWorkingJson(workingJson);

    return workingJson;
  };

  setWorkingJson = (workingJson) => {
    const { savedJson } = this.state;

    this.setState({
      hasEdits: savedJson !== workingJson,
      workingJson,
    });
  };

  async saveJson() {
    const { workingJson, draftContentId } = this.state;
    if (draftContentId) {
      await this.docRef.collection('content').doc(draftContentId).set({ json: workingJson });
    } else {
      const draftRef = await this.docRef.collection('content').add({ json: workingJson });
      await this.docRef.set({ draftContentId: draftRef.id }, { merge: true });
      this.setState({ draftContentId });
    }
    this.setState({
      hasEdits: false,
      savedJson: workingJson,
    });
  }

  async publishJson() {
    const { draftContentId } = this.state;
    await this.docRef.set({
      publishedContentId: draftContentId,
      draftContentId: null,
    }, { merge: true });
  }

  renderPublishButton() {
    const { json } = this.props;
    const { workingJson } = this.state;
    const isDisabled = JSON.stringify(json) === JSON.stringify(workingJson);

    return (
      <Clickable
        className={`
          px-2 text-white bg-green-500
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}
        `}
        disabled={isDisabled}
        onClick={this.handleOnClickActionButton}
      >
        Publish
      </Clickable>
    );
  }

  renderSaveButton() {
    const { hasEdits } = this.state;

    return (
      <Clickable
        className={`
          px-2 text-white bg-orange-500
          ${!hasEdits ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}
        `}
        disabled={!hasEdits}
        onClick={this.handleOnClickActionButton}
      >
        Save Changes
      </Clickable>
    );
  }

  renderEditorControls() {
    const { hasEdits } = this.state;

    return (
      <div>
        <div className="flex flex-row items-center justify-between w-full h-16 px-5 border-b border-gray-900">
          <div>
            {hasEdits ? this.renderSaveButton() : this.renderPublishButton()}
          </div>
          <div>
            <Clickable
              aria-label="Close"
              className={`
                flex flex-col items-center justify-center pointer-events-auto
                -mr-5 w-16 h-16 py-2 text-black text-2xl
              `}
              styledAs="none"
              onClick={() => {
                this.setState({ isOpen: false });
              }}
            >
              ✕
            </Clickable>
          </div>
        </div>
      </div>
    );
  }

  renderEditorContent() {
    const { render } = this.props;
    const { workingJson, savedJson } = this.state;

    if (typeof render === 'function') {
      return render({
        workingJson,
        savedJson,
        setWorkingJson: this.setWorkingJson,
      });
    }

    return (
      <div
        className="flex flex-col flex-grow overflow-auto py-5"
        style={{
          backgroundColor: 'rgb(39, 40, 34)',
        }}
      >
        <ReactJsonView
          src={workingJson}
          theme="monokai"
          shouldCollapse={({ type }) => type === 'array'}
          onAdd={this.handleOnUpdate}
          onDelete={this.handleOnUpdate}
          onEdit={this.handleOnUpdate}
        />
      </div>
    );
  }

  renderEditButton() {
    const { buttonPosition } = this.props;
    const { hasEdits, draftContentId } = this.state;

    const readyToPublish = !hasEdits && draftContentId;

    return (
      <Clickable
        aria-label="Edit"
        className={`
          absolute top-0 ${buttonPosition}-0 -m-3
          flex flex-col items-center justify-center pointer-events-auto
          w-8 h-8 py-2 text-white text-xl rounded-full shadow-lg
          ${hasEdits || readyToPublish ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}
        `}
        styledAs="none"
        onClick={() => {
          this.setState({ isOpen: true });
        }}
      >
        <span>
          <span className="flex flex-row whitespace-no-wrap">
            {hasEdits ? (
              <span>...</span>
            ) : (
              <span className="transform -scale-x-100">✎</span>
            )}
          </span>
        </span>
      </Clickable>
    );
  }

  render() {
    const { children } = this.props;
    const {
      isOpen, isLoading, isPreviewing, workingJson,
    } = this.state;

    if (isLoading) return (<Editor.LOADER />);

    if (isPreviewing) return children({ workingJson });

    return (
      <div className="flex flex-col w-full h-full relative p-6">
        <div
          className={`
            absolute flex flex-col top-0 bottom-0 left-0 right-0
            border border-dashed border-white
          `}
        >
          {this.renderEditButton()}
        </div>
        <WindowSize>
          {({ width }) => (
            <>
              {width > 1023 && (
                <Dock position="right" isVisible={isOpen}>
                  <div className="flex flex-col w-full h-full">
                    {this.renderEditorControls()}
                    {this.renderEditorContent()}
                  </div>
                </Dock>
              )}
              {width <= 1023 && (
                <div
                  className={`
                    fixed top-0 left-0 right-0 bottom-0 z-50 bg-white
                    ${isOpen ? 'block' : 'hidden'}
                  `}
                >
                  <div className="flex flex-col w-full h-full">
                    {this.renderEditorControls()}
                    {this.renderEditorContent()}
                  </div>
                </div>
              )}
            </>
          )}
        </WindowSize>
        {children({ workingJson })}
      </div>
    );
  }
}
