// All functions will recieve an express(like) request and response
// and can be called from the app using the path '/api/functions/<functionName>'

export const customFunction = (request, response) => {
  /* tslint:disable-next-line */
  console.log('File: ' + request.originalUrl)
  setTimeout(() => {
    response.send('Hello from the cloud')
  }, 5000)
}
