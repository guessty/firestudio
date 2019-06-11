import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//
import Nav from '@partials/Nav';
import Main from '@partials/Main';
import Footer from '@partials/Footer';

require('./Page.scss');

export default class Page extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <div className="Page">
        <Nav />
        <Main>
          {children}
        </Main>
        <Footer />
      </div>
    );
  }
}
