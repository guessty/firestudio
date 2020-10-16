import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Clickable, Loader } from '@firepress/ui';
import Dock from 'react-dock';
import WindowSize from '@reach/window-size';

const getBlockContent = async (blockData) => {
  try {
    let draftContent = null;
    const draftContentRef = blockData.draftContent;
    if (draftContentRef) {
      const draftContentDoc = await draftContentRef.get();
      if (draftContentDoc.exists) {
        draftContent = draftContentDoc.data();
      };
    }

    let publishedContent = null;
    const publishedContentRef = blockData.publishedContent;
    if (publishedContentRef) {
      const publishedContentDoc = await publishedContentRef.get();
      if (publishedContentDoc.exists) {
        publishedContent = publishedContentDoc.data();
      };
    }

    return {
      ...blockData,
      draftContent,
      publishedContent,
    }
  } catch {
    return blockData;
  }
};

export default class Editor extends Component {
  static propTypes = {
    blockId: PropTypes.string.isRequired,
    db: PropTypes.shape({}).isRequired,
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

  static Loader = () => (
    <div className="fp-cms__editor__loader-container">
      <Loader className="fp-cms__editor__loader" />
    </div>
  );

  blockRef;

  state = {
    isLoading: false,
    // eslint-disable-next-line react/destructuring-assignment
    workingContent: this.props.content,
    // eslint-disable-next-line react/destructuring-assignment
    savedContent: this.props.content,
    hasEdits: false,
    isOpen: false,
    blockData: {},
  };

  async componentDidMount() {
    const { db, blockId } = this.props;
    setTimeout(() => {
      this.blockRef = db.collection('_blocks').doc(blockId);
      this.setState({
        isLoading: true,
      }, async () => {
        const blockDoc = await this.blockRef.get();
        let blockData = {
          publishedContent: null,
          draftContent: null,
          versionHistory: [],
        };
        if (!blockDoc.exists) {
          await this.blockRef.set({
            ...blockData,
          });
        } else {
          blockData = blockDoc.data();
        }

        const blockDataWithContent = await getBlockContent(blockData);

        const workingContent = (blockDataWithContent?.draftContent || blockDataWithContent?.publishedContent)?.json || {};

        this.setState({ isLoading: false, workingContent, blockData });
      });
    }, 0);
  }

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

  handleSave = () => {
    const { db } = this.props;
    const { workingContent, blockData } = this.state;

    this.setState({ isSaving: true }, async () => {
      let draftRef = blockData.draftContent;
      if (draftRef) {
        await draftRef.set({ json: workingContent }, { merge: true });
      } else {
        draftRef = await db.collection('_content').add({ json: workingContent });
        await this.blockRef.set({ draftContent: draftRef }, { merge: true });
      }
  
      this.setState({
        isSaving: false,
        hasEdits: false,
        savedContent: workingContent,
        blockData: {
          ...blockData,
          draftContent: draftRef,
        },
      });
    })
  }

  handlePublish = () => {
    const { blockData } = this.state;

    this.setState({ isPublishing: true }, async () => {
      const nextBlockData = {
        publishedContent: blockData.draftContent,
        draftContent: null,
        versionHistory: [
          ...blockData.versionHistory,
          blockData.draftContent,
        ],
      };

      await this.blockRef.set(nextBlockData, { merge: true });

      this.setState({
        isPublishing: false,
        blockData: nextBlockData,
      })
    });
  }

  renderActionButton() {
    const { hasEdits, isSaving, isPublishing, blockData } = this.state;

    const isPublished = !hasEdits && !isPublishing && !blockData.draftContent && blockData.publishedContent;

    let label = hasEdits || isPublished ? 'Save' : 'Publish';
    if (isSaving) label = 'Saving...';
    if (isPublishing) label = 'Publishing...';

    return (
      <Clickable
        className={`
          fp-cms__editor__save-button
          ${isSaving || isPublishing || isPublished
            ? 'fp-cms__editor__save-button--disabled' : ''}
        `}
        disabled={isSaving || isPublishing || isPublished}
        onClick={hasEdits ? this.handleSave : this.handlePublish}
      >
        {label}
      </Clickable>
    );
  }

  renderEditorControls() {
    return (
      <div>
        <div className="fp-cms__editor__editor-controls">
          <div>
            {this.renderActionButton()}
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
    const { hasEdits, blockData } = this.state;

    const readyToPublish = !hasEdits && blockData.draftContent;

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
      isOpen, isLoading, workingContent: content,
    } = this.state;

    if (isLoading) return (<Editor.Loader />);

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
          {children(content)}
        </div>
      </div>
    );
  }
}
