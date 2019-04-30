import React, { PureComponent } from 'react';
//
import Flex from '@atoms/Flex';
import SayHelloButton from '@elements/SayHelloButton';
//

export default class extends PureComponent {
  render() {
    return (
      <Flex className="flex-around-8">
        <Flex className="flex-between-2">
          <h1>Cloud Functions</h1>
          <strong>Extend your apps functionality without servers or runtime environments</strong>
        </Flex>
        <hr />
        <Flex className="flex-between-4">
          <p>
            Firestudio uses Firebase to host your app serverlessly meaning you don&apos;t have to
            worry about configuring a server environment.
          </p>
          <p>
            Although this keeps things simple it does mean that there is now no server to be
            able to securely process certain requests.
          </p>
          <p>- This is where Cloud Functions come in.</p>
          <p>
            Simply add functions to &apos;/src/functions&apos; folder and next-spa will
            configure and upload them to Firebase Cloud Functions.
          </p>
          <p>
            You can use the your custom functions to extend your app and
            perform backend fucntionality.
          </p>
          <p>
            All functions can be called directly from you app from the
            path
            {`/functions/${'<yourCustomFunction>'}`}
            .
          </p>
          <p>** Note **</p>
          <p>
            Your functions will also be hosted on their own externally available url (e.g
            {`https://${'<your-firebase-app>'}.cloudfunctions.net/${'<yourCustomFunction>'}`}
            ) so remain vigilent about what information you return and add in authentication
            steps as needed.
          </p>
        </Flex>
        <h2>Example Function</h2>
        <Flex className="flex-between-4">
          <p>
            You will find an example function (customFunction) in the
            &apos;src/functions&apos; folder
          </p>
          <code>
            {`
              export const customFunction = (request, response) => {
                console.log('File: ' + request.originalUrl)
                response.send('Hello from the cloud')
              }
            `}
          </code>
          <p>You can trigger this cloud function by clicking the button below</p>
          <div>
            <SayHelloButton />
          </div>
        </Flex>
      </Flex>
    );
  }
}
