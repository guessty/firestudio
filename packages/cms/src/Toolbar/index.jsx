import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from '@firepress/core/router';
import parseUrl from 'url-parse';
import { Clickable, Flex, Menu } from '@firepress/ui';

export default class Toolbar extends Component {
  static propTypes = {
    firebase: PropTypes.shape({}),
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
  };

  static defaultProps = {
    firebase: undefined,
    children: null,
  };

  state = {
    editorIsEnabled: false,
    mode: 'default'
  };

  async componentDidMount() {
    const { firebase } = this.props;
    setTimeout(() => {
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
        this.checkAndEnableEditor(user);
      });
    }, 0);
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  checkAndEnableEditor = async (user) => {
    const { query: { fpmode } } = parseUrl(Router.router.asPath, true);
    if (user) {
      const idTokenResult = await user.getIdTokenResult();
      if (idTokenResult.claims.editor) {
        this.setState({ editorIsEnabled: true, mode: fpmode || 'default' });
      }
    }
  };

  handleChangeMode = (e) => {
    const fpmode = e.target.value;
    const parsedUrl = parseUrl(Router.router.asPath, '/', true);
    parsedUrl.set('query', {
      ...parsedUrl.query,
      fpmode,
    });
    Router.replaceRoute(parsedUrl.href);
    this.setState({
      mode: fpmode,
    });
  }

  render() {
    const { children } = this.props;
    const { editorIsEnabled, mode } = this.state;

    return editorIsEnabled && (
      <div className="fp-cms__toolbar">
        <span>Firepress CMS</span>
        <div className="fp-cms__toolbar__options">
          <div className="fp-cms__toolbar__mode">
            <span>Mode:</span>
            <div>
              <select value={mode} onChange={this.handleChangeMode}>
                <option value="default">Live (default)</option>
                <option value="edit">Edit</option>
                <option value="preview">Preview</option>
              </select>
            </div>
          </div>
          {children && (
            <div>
              <Menu
                autoAdjustPosition
                keepInDom
                buttonComponent={(
                  <Clickable
                    aria-label="Tools Menu"
                    as="button"
                    className="fp-cms__toolbar__menu-button"
                    styledAs="none"
                  >
                    ☰
                  </Clickable>
                )}
                containerClassName="fp-cms__toolbar__menu"
                position="bottomRight"
                render={() => (
                  <div className="">
                    {children}
                  </div>
                )}
              />
            </div>
          )}
        </div>
      </div>  
    );
  }
}
