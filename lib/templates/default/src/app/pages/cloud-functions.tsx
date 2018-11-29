import * as React from 'react'
import { Flex } from 'react-grid-flexbox'
//
import SayHelloButton from '@containers/SayHelloButton'
//

export default () => (
  <Flex gutter="2rem">
    <Flex gutter="0.5rem">
      <h1>Cloud Functions</h1>
      <strong>Extend your apps functionality without servers or runtime environments</strong>
    </Flex>
    <hr />
    <Flex gutter="1rem">
      <p>Firestudio uses Firebase to host your app serverlessly meaning you don't have to
          worry about configuring a server environment.</p>
      <p>Although this keeps things simple it does mean that there is now no server to be
          able to securely process certain requests.</p>
      <p>- This is where Cloud Functions come in.</p>
      <p>Simply add functions to '/src/functions' folder and next-spa will configure and upload
          them to Firebase Cloud Functions</p>
      <p>You can use the your custom functions to extend your app and perform backend fucntionality.</p>
      <p>All functions can be called directly from you app from the path '/functions/${'<yourCustomFunction>'}'</p>
      <p>** Note **</p>
      <p>Your functions will also be hosted on their own externally available url
          (e.g 'https://${'<your-firebase-app>'}.cloudfunctions.net/${'<yourCustomFunction>'}')
          so remain vigilent about what information you return and add in authentication steps as needed.</p>
    </Flex>
    <h2>Example Function</h2>
    <Flex gutter="1rem">
      <p>You will find an example function (customFunction) in the 'src/functions' folder</p>
      <code>{`
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
)
