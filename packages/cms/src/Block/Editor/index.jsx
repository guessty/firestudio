import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firepress/core/router';
import { Clickable, Loader } from '@firepress/ui';
import Dock from 'react-dock';
import WindowSize from '@reach/window-size';
import parseUrl from 'url-parse';

import { getBlockById } from '../index';

export default class Editor extends Component {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    firebase: PropTypes.shape({}).isRequired,
    content: PropTypes.shape({}),
    buttonPosition: PropTypes.oneOf(['left', 'right']),
    children: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonPosition: 'right',
    content: {},
    render: undefined,
  };

  static getDraftBlock = async (firebase, blockId) => {
    const { content, draftContentId } = await getBlockById(firebase, blockId, true) || {};

    return { content, draftContentId, blocks: {} };
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
    workingContent: this.props.content,
    // eslint-disable-next-line react/destructuring-assignment
    savedContent: this.props.content,
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
        const { content, draftContentId } = await Editor.getDraftBlock(firebase, blockId);
        if (draftContentId) {
          this.setState({ workingContent: content, draftContentId });
        }
        this.setState({ isLoading: false });
      });
    }, 0);
  }

  handleOnClickActionButton = () => {
    const { hasEdits } = this.state;
    if (hasEdits) {
      this.save();
    } else {
      this.publish();
    }
  };

  handleOnUpdate = ({ updated_src: workingContent }) => {
    this.setWorkingContent(workingContent);

    return workingContent;
  };

  setWorkingContent = (workingContent) => {
    const { savedContent } = this.state;

    this.setState({
      hasEdits: savedContent !== workingContent,
      workingContent,
    });
  };

  async save() {
    const { workingContent, draftContentId } = this.state;
    if (draftContentId) {
      await this.docRef.collection('content').doc(draftContentId).set(workingContent);
    } else {
      const draftRef = await this.docRef.collection('content').add(workingContent);
      await this.docRef.set({ draftContentId: draftRef.id }, { merge: true });
      this.setState({ draftContentId });
    }
    this.setState({
      hasEdits: false,
      savedContent: workingContent,
    });
  }

  async publish() {
    const { draftContentId } = this.state;
    await this.docRef.set({
      publishedContentId: draftContentId,
      draftContentId: null,
    }, { merge: true });
  }

  renderPublishButton() {
    const { content } = this.props;
    const { workingContent } = this.state;
    const isDisabled = JSON.stringify(content) === JSON.stringify(workingContent);

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
    const { workingContent, savedContent } = this.state;

    return render({
      workingContent,
      savedContent,
      setWorkingContent: this.setWorkingContent,
    });
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
      isOpen, isLoading, isPreviewing, workingContent,
    } = this.state;

    if (isLoading) return (<Editor.LOADER />);

    if (isPreviewing) return children({ workingContent });

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
              {width >= 1280 && (
                <Dock position="right" isVisible={isOpen}>
                  <div className="flex flex-col w-full h-full">
                    {this.renderEditorControls()}
                    {this.renderEditorContent()}
                  </div>
                </Dock>
              )}
              {width < 1280 && (
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
        {children({ workingContent })}
      </div>
    );
  }
}
