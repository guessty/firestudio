# firestudio default project

### Download manually

#### Download the example:

```
curl https://codeload.github.com/guessty/firestudio/tar.gz/v0.4.1 | tar -xz --strip=2 firestudio-0.4.1/examples/default && mv ./default ./firestudio-default-project

cd firestudio-defaul-project
```

#### Set up firebase:

* install Firebase Tools: `npm i -g firebase-tools`
* create a project through the [firebase web console](https://console.firebase.google.com/)
* grab the project's ID from the web consoles URL: https://console.firebase.google.com/project/<projectId>
* update the `firestudio.config.js` firebase project ID to the newly created project
* login to the Firebase CLI tool with `firebase login`

#### Install project:

```bash
npm install
```

#### Run Firestudio development environment:

```bash
npm run start
```

#### Build and Deploy the project to the cloud with Firebase:

```bash
npm run deploy
```
