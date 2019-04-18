import React from 'react';
//
import Flex from '@atoms/Flex';
import Nav from '@elements/Nav';
import Footer from '@elements/Footer';

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
