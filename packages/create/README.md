# firestudio

A cli for creating apps using NextJS and firebase. - Uses a highly opinionated boilerpate (see `/lib/templates/default`).

## Set Up

### Step 1: Install Firestudio globally

`npm i -g firestudio`

### Step 2: Create Firestudio App

In the console run `firestudio create <your-app-name>`.

This will create a Firestudio project and install all dependencies.

### Step 3: Set up firebase:

You will need to configue firebase to serve the app locally and deploy.

* create a project through the [firebase web console](https://console.firebase.google.com/)
* grab the project's ID from the web consoles URL: https://console.firebase.google.com/project/<projectId>
* install Firebase Tools: `npm i -g firebase-tools`
* login to the Firebase CLI tool with `firebase login`


### Step 4: Update you app's next.config.js file with your firebase projectId:


```javascript
withSPA = require('next-spa').withSPA

module.exports = withSPA({
  nextFire: {
    projectId: <projectId>
  }
})

```

### Step 5: Start developing

The `package.json` file comes with some with all the scripts you need to get started.

- Dev: `npm run dev`
- Build: `npm run build`
- Serve Build Locally: `npm run serve`
- Deploy: `npm run deploy`

