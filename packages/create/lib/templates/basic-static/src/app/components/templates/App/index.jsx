import React from 'react';
import { Flex } from '@firestudio/ui';
//
import Nav from '@partials/Nav';
import Footer from '@partials/Footer';

require('./App.scss');

const AppLayout = ({ children }) => (
  <div className="App">
    <Nav />
    <Flex>
      {children}
    </Flex>
    <Footer />
  </div>
);

export default AppLayout;
