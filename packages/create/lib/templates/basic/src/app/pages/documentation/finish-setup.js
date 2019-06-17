import React, { PureComponent } from 'react';
import { Flex, Hr } from '@firestudio/ui';

import Container from '@elements/Container';

export default class FinishSetup extends PureComponent {
  render() {
    return (
      <Container>
        <Flex className="gap-around-8">
          <Flex>
            <h1 className="text-4xl font-semibold">Finish Setup</h1>
          </Flex>
          <Hr />
          <Flex className="gap-between-4">
            <p>
              In order to interact with any of the Firebase services you need to create a Firebase project and add the configuration to your Firestudio App.
            </p>
            <p>
              Go to your Firebase console (https://console.firebase.google.com/) and click the tile to create a new project.
              This will bring up a dialog window for you to create a new project.
              Enter a <q>Project name</q>, uncheck the <q>Use the default settings for sharing Google Analytics for Firebase data</q> option, and click <q>Continue</q>.
              If you&#39;re creating an app for the first time you probably don&#39;t care about any of the Sharing options, so leave all the boxes unchecked and click <q>Create Project</q>.
              Once you&#39;re Firebase app has been created go to your app&#39;s dashboard.
            </p>
            <p>
              Click the <q>Settings</q> icon (top left), and go to <q>Project Settings</q>.
              On the <q>General</q> tab, you will see the section <q>Your apps</q> which should be empty.
              Select the <q>Web</q> platform ({'< />'} icon) to register your web app.
              Give your app a <q>Nickname</q> and click <q>Register App</q>.
              You will then be shown your app&#39;s config which will look something like:
            </p>
            <pre>
              <code>
                {
`firebaseConfig = {
  apiKey: "<api-key />",
  authDomain: "<auth-domain />",
  databaseURL: "<database-url />",
  projectId: "<project-id />",
  storageBucket: "<storage-bucket />",
  messagingSenderId: "<messaging-sender-id />",
  appId: "<app-id>"
};`
                }
              </code>
            </pre>
            <p>This is the config that you will need to copy into your Firestudio App.</p>
          </Flex>
        </Flex>
      </Container>
    );
  }
}
