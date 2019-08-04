# firestudio default boilerplate

A highly opinionated boilerplate for developing apps using NextJS and Firebase.

## Set Up

### Step 1: Setup firebase:

You will need to configue firebase to serve the app locally and deploy.

* create a project through the [firebase web console](https://console.firebase.google.com/)
* grab the project's ID from the web consoles URL: https://console.firebase.google.com/project/<projectId>
* install Firebase Tools: `npm i -g firebase-tools`
* login to the Firebase CLI tool with `firebase login`


### Step 2: Update you app's next.config.js file with your firebase projectId:


```javascript
withSPA = require('next-spa').withSPA

module.exports = withSPA({
  nextFire: {
    projectId: <projectId>
  }
})

```

### Step 3: Start developing

The `package.json` file comes with some with all the scripts you need to get started.

- Dev: `npm run dev`
- Build: `npm run build`
- Serve Build Locally: `npm run serve`
- Deploy: `npm run deploy`

