import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import BoldIcon from 'megadraft/lib/icons/bold';
import ItalicIcon from 'megadraft/lib/icons/italic';
import LinkIcon from 'megadraft/lib/icons/link';
import ULIcon from 'megadraft/lib/icons/ul';
import OLIcon from 'megadraft/lib/icons/ol';
import H2Icon from 'megadraft/lib/icons/h2';
import BlockQuoteIcon from 'megadraft/lib/icons/blockquote';

const MegadraftEditor = React.lazy(() => import('megadraft').then(mod => mod.MegadraftEditor));

const H4Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 20">
    <path d="M5 5v3h5v11h3V8h5V5z" fill="currentColor" fillRule="evenodd" />
  </svg>
);

export default class RickTextBlock extends PureComponent {
  static propTypes = {
    content: PropTypes.shape({}),
    onSetWorkingContent: PropTypes.func.isRequired,
  };

  static defaultProps = {
    content: convertToRaw(EditorState.createEmpty().getCurrentContent()),
  };

  static DEFAULT_CONTENT = convertToRaw(EditorState.createEmpty().getCurrentContent());

  static ACTIONS = [
    {
      type: 'inline', label: 'B', style: 'BOLD', icon: BoldIcon,
    },
    {
      type: 'inline', label: 'I', style: 'ITALIC', icon: ItalicIcon,
    },
    {
      type: 'entity', label: 'Link', style: 'link', entity: 'LINK', icon: LinkIcon,
    },
    { type: 'separator' },
    {
      type: 'block', label: 'UL', style: 'unordered-list-item', icon: ULIcon,
    },
    {
      type: 'block', label: 'OL', style: 'ordered-list-item', icon: OLIcon,
    },
    {
      type: 'block', label: 'H3', style: 'header-three', icon: H2Icon,
    },
    {
      type: 'block', label: 'H4', style: 'header-four', icon: H4Icon,
    },
    {
      type: 'block', label: 'QT', style: 'blockquote', icon: BlockQuoteIcon,
    },
  ]

  static jsonToHtml = (json) => {
    const contentState = convertFromRaw(json || RickTextBlock.DEFAULT_CONTENT);
    const editorState = EditorState.createWithContent(contentState);

    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  static renderer = ({ content }) => {
    const contentState = convertFromRaw(content || RickTextBlock.DEFAULT_CONTENT);
    const editorState = EditorState.createWithContent(contentState);
    const __html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    return (
      <div
        className="megadraft-renderer"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html }}
      />
    );
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    editorState: EditorState.createWithContent(convertFromRaw(this.props.content
      || RickTextBlock.DEFAULT_CONTENT)),
  };

  handleEditorStateChange = (editorState) => {
    const { onSetWorkingContent } = this.props;
    this.setState({ editorState });
    onSetWorkingContent(convertToRaw(editorState.getCurrentContent()));
  };

  render() {
    const { editorState } = this.state;

    return (
      <div
        className="fp-cms__rich-text-editor"
      >
        <div
          className="fp-cms__rich-text-editor__container"
          style={{ maxWidth: '740px' }}
        >
          <div style={{ marginLeft: 80 }}>
            <Suspense fallback={<div>Loading...</div>}>
              <MegadraftEditor
                actions={RickTextBlock.ACTIONS}
                editorState={editorState}
                onChange={this.handleEditorStateChange}
                placeholder="Add some text"
              />
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
