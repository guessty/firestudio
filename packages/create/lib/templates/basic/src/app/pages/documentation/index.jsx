
In order to interact with any of the Firebase services you need to create a Firebase project and add the configuration to your Firestudio App.

Go to your Firebase console (https://console.firebase.google.com/) and click the tile to create a new project.
This will bring up a dialog window for you to create a new project.
Enter a "Project name", uncheck the "Use the default settings for sharing Google Analytics for Firebase data" option, and click "Continue".
If you're creating an app for the first time you probably don't care about any of the Sharing options, so leave all the boxes unchecked and click "Create Project".
Once you're Firebase app has been created go to your app's dashboard.



Click the 'Settings' icon (top left), and go to 'Project Settings'.
On the 'General' tab, you will see the section 'Your apps' which should be empty.
Select the 'Web' platform (`< />` icon) to register your web app.
Give your app a 'Nickname' and click 'Register App'.
You will then be shown your app's config which will look something like:
```
firebaseConfig = {
  apiKey: "<api-key>",
  authDomain: "<auth-domain>",
  databaseURL: "<database-url>",
  projectId: "<project-id>",
  storageBucket: "<storage-bucket>",
  messagingSenderId: "<messaging-sender-id>",
  appId: "<app-id>"
};
```
This is the config that you will need to copy into your Firestudio App.
In 