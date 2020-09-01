import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Clickable, Loader } from '@firepress/ui';
import Dock from 'react-dock';
import WindowSize from '@reach/window-size';

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
    <div className="fp-cms__editor__loader-container">
      <Loader className="fp-cms__editor__loader" />
    </div>
  );

  docRef;

  state = {
    isLoading: false,
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
    setTimeout(() => {
      const db = firebase.firestore();
      this.docRef = db.collection('blocks').doc(blockId);
      this.setState({
        isLoading: true,
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
          fp-cms__editor__publish-button
          ${isDisabled ? 'fp-cms__editor__publish-button--disabled' : ''}
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
          fp-cms__editor__save-button
          ${!hasEdits ? 'fp-cms__editor__save-button--disabled' : ''}
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
        <div className="fp-cms__editor__editor-controls">
          <div>
            {hasEdits ? this.renderSaveButton() : this.renderPublishButton()}
          </div>
          <div>
            <Clickable
              aria-label="Close"
              className="fp-cms__editor__close-button"
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
          fp-cms__editor__edit-button fp-cms__editor__edit-button--${buttonPosition}
          ${hasEdits || readyToPublish ? 'fp-cms__editor__edit-button--save' : 'fp-cms__editor__edit-button--publish'}
        `}
        styledAs="none"
        onClick={() => {
          this.setState({ isOpen: true });
        }}
      >
        <span>
          <span className="fp-cms__editor__edit-button__label">
            {hasEdits ? (
              <span>...</span>
            ) : (
              <span className="fp-cms__editor__edit-button__icon">✎</span>
            )}
          </span>
        </span>
      </Clickable>
    );
  }

  render() {
    const { children } = this.props;
    const {
      isOpen, isLoading, workingContent,
    } = this.state;

    if (isLoading) return (<Editor.LOADER />);

    return (
      <div className="fp-cms__editor">
        <div className="fp-cms__editor__indicator">
          {this.renderEditButton()}
        </div>
        <WindowSize>
          {({ width }) => (
            <>
              {width >= 1280 && (
                <Dock position="right" isVisible={isOpen}>
                  <div className="fp-cms__editor__container">
                    {this.renderEditorControls()}
                    {this.renderEditorContent()}
                  </div>
                </Dock>
              )}
              {width < 1280 && (
                <div
                  className={`
                    fp-cms__editor__full-screen
                    ${isOpen ? 'fp-cms__editor--block' : 'fp-cms__editor--hidden'}
                  `}
                >
                  <div className="fp-cms__editor__container">
                    {this.renderEditorControls()}
                    {this.renderEditorContent()}
                  </div>
                </div>
              )}
            </>
          )}
        </WindowSize>
        <div className="fp-cms__editor__content">
          {children({ workingContent })}
        </div>
      </div>
    );
  }
}
