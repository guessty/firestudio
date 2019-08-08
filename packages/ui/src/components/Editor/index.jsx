import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { Subscribe } from '@firepress/core/store';

import { Cms as CmsContainer } from '../../store';

import 'react-quill/dist/quill.bubble.css';

class Editor extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    delta: PropTypes.shape({
      ops: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }

  static defaultProps = {
    placeholder: 'Write here...',
    delta: {
      ops: [
        { insert: 'Hello' },
        {
          attributes: { header: 1 },
          insert: '\n',
        },
        { insert: 'This is content from an editor\n' },
      ],
    },
  }

  static modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { header: '3' }, { header: '4' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  }

  static formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ]

  static renderContent(deltaOps, config = {}) {
    const converter = new QuillDeltaToHtmlConverter(deltaOps, config);

    return <div dangerouslySetInnerHTML={{ __html: converter.convert() }} />;
  }

  static getDerivedStateFromProps(props, state) {
    return {
      delta: props.delta === state.delta ? undefined : state.delta,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      delta: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.editor = createRef();

    if (typeof window !== 'undefined') {
      this.ReactQuill = require("react-quill");
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true,
    });
  }

  handleChange() {
    if (this.editor.current) {
      this.setState({
        delta: this.editor.current.getEditor().getContents(),
      });
    }
  }

  render() {
    const { isMounted, delta: stateDelta } = this.state;
    const {
      placeholder,
      delta: propDelta,
      cms: { state: { readOnly } },
    } = this.props;
    const ReactQuill = this.ReactQuill;

    const delta = stateDelta || propDelta;

    return (!isMounted || readOnly) ? Editor.renderContent(delta.ops) : (
      <ReactQuill
        ref={this.editor}
        theme="bubble"
        onChange={this.handleChange}
        value={delta}
        modules={Editor.modules}
        formats={Editor.formats}
        placeholder={placeholder}
      />
    );
  }
}

export default Subscribe({ cms: CmsContainer })(Editor);
