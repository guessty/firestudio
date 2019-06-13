# firestudio

A framework for rapid development using React and Firebase.

## Summary

Developing and hosting a web application is a time consuming process.
With an ever changing landscape of technologies, getting started can be daunghting even for the most seasoned developer.

This is where Firestudio can help.

Firestudio provides you with an out of the box solution for developing React applications and hosting them on Google's Firebase platform.

## Whats in the box?

Firestudio is all about using technologies which are:
1) Simple to use.
2) Have great documentation.
3) Enable you to develop faster.

Firestudio comes packaged with/support for:
1) ReactJS (https://reactjs.org/)
2) NextJS (https://nextjs.org/)
3) Firebase (https://firebase.google.com/)
4) Tailwindcss (https://tailwindcss.com/)
5) Prismic (https://prismic.io)

## Set Up - Method 1 (Recommended)

Ensure you have the following before you get started:
1) Github Account (https://github.com/)
2) Gitpod Account (https://www.gitpod.io/) - is free for public repos
3) Google Firebase Account (https://firebase.google.com/)
4) Are using Chrome browser and have the Gitpod chrome extension installled (https://chrome.google.com/webstore/detail/gitpod-online-ide/dodmmooeoklaejobgleioelladacbeki?hl=en)

### Step 1: Create a Repository through Github.

Go to you Github Account and create a new repository

### Step 2: Open Repo in Gitpod

Go into your newly created repo, and if you have the Gitpod chrome extenstion installed click the "Gitpod" button to open the repo in Gitpod.

### Step 3: Install the Firestudio App Creator globally




### Step 1: Install the Firestudio App Creator globally

`npm i -g @firestudio/create`

### Step 2a: Initialise your Firestudio App

If you have an existing repo on Github,

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

