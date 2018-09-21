import * as functions from 'firebase-functions'

export const customFunction = functions.https.onRequest((request, response) => {
  /* tslint:disable-next-line */
  console.log('File: ' + request.originalUrl)
  response.send('Hello from the cloud')
})
