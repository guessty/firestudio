# Firestudio App Creator

A framework for rapid development using React and Firebase.

---

## Summary

Developing and hosting a web application is a time consuming process.
With an ever changing landscape of technologies, getting started can be daunghting even for the most seasoned developer.

This is where Firestudio can help.

Firestudio provides you with an out of the box solution for developing React applications and hosting them on Google's Firebase platform.

--- 

## Whats in the box?

Firestudio is all about using technologies which are:
- Simple to use.
- Have great documentation.
- Enable you to develop faster.

Firestudio is built using:
- NextJS (https://nextjs.org/)
- Firebase (https://firebase.google.com/)
- Tailwindcss (https://tailwindcss.com/)

---

## Set Up

If you're new to web developmemt; don't have NodeJS installed on your machine; or just want to try something new then we recommend giving Gitpod IDE a try.

If you know what you're doing and happy with your own set up then you can jump straight to Step 3.

---

### Step 1: Gitpod IDE

Ensure you have the following before you get started:
1) Github Account (https://github.com/)
2) Gitpod Account (https://www.gitpod.io/) - it is free for public repos
3) Are using Chrome browser and have the Gitpod chrome extension installled (https://chrome.google.com/webstore/detail/gitpod-online-ide/dodmmooeoklaejobgleioelladacbeki?hl=en)

---

### Step 2: Create a Repository and open with Gitpod

Go to you Github Account and create a new repository.
With the Gitpod Chrome extension installed, go into your newly created repo and click the "Gitpod" button to open the repo in Gitpod.

---

### Step 3: Install the App Creator and create a Firestudio App

In the console run the following command to install the App Creator:
```
npm i -g @firestudio/create
```

Use the create command in the following format to create a Firestudio App:
```
firestudio create <directory> -t <template>
```

**Note for Gitpod users**

As you will already be in your project's root directory run the following command to initialise Firestudio:
```
firestudio create . -t basic
```

Firestudio's 'basic' template will be installed along with all dependencies.

---

### Step 4: Run Development Environment.

At this point you can spin up a dev environment and have a play around.

To start the dev server run the command:
```
npm run dev
```
The project will be running on port `3040`.

**Note for Gitpod users**

Gitpod provides two ways to view your running project:
1) In a Preview window.
2) In the Browser.

A popup should appear allowing to choose a way to view the running project.

If you loose the popup window there is an 'Open ports' tab in the console window which provides access to the same options.

---

### Step 5: Read the Firestudio documentation included with your template.

Rather than complicating this readme any further, each template comes with its own documentation which you can use to finish setting up your app, and to learn about additional features.
