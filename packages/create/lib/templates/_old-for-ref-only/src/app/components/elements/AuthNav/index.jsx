import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Flex, Clickable, Avatar } from '@firestudio/ui';
//
import withAuth from '@hocs/withAuth';
//
require('./AuthNav.scss');
//

class AuthNav extends Component {
  render() {
    const { user, auth, uiConfig } = this.props;

    return user ? (
      <Flex className="flex-row h-full items-center">
        <div className="hidden sm:block">
          <Avatar user={user} />
        </div>
        <div className="hidden sm:block border-r border-blue w-1 h-10 m-4" />
        <Clickable
          styledAs="none"
          onClick={() => auth.signOut()}
          className="hidden sm:block mr-4 border-blue bg-white text-blue hover:bg-grey-light focus:bg-grey-light"
        >
          Sign Out
        </Clickable>
      </Flex>
    ) : (
      <Flex className="flex-row h-full items-center">
        <StyledFirebaseAuth
          className="AuthNav"
          uiConfig={uiConfig}
          firebaseAuth={auth.auth()}
        />
      </Flex>
    );
  }
}

export default withAuth(AuthNav, { invertLoader: true });
