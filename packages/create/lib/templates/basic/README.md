# Basic Template for Firestudio

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

Firestudio is built using:
1) NextJS (https://nextjs.org/)
2) Firebase (https://firebase.google.com/)
4) Tailwindcss (https://tailwindcss.com/)

Firestudio also provides support for connecting to:
1) Prismic (coming soon)
2) Disqus (coming soon)
3) Mailchimp (coming soon)

## Set Up - Method 1 (Recommended).

Ensure you have the following before you get started:
1) Github Account (https://github.com/)
2) Gitpod Account (https://www.gitpod.io/) - is free for public repos
3) Are using Chrome browser and have the Gitpod chrome extension installled (https://chrome.google.com/webstore/detail/gitpod-online-ide/dodmmooeoklaejobgleioelladacbeki?hl=en)

### Step 1: Create a Repository and open with Gitpod.

Go to you Github Account and create a new repository.
Go into your newly created repo and click the "Gitpod" button to open the repo in Gitpod.

**Note: You need to have the Gitpod Chrome extension installed**

### Step 2: Install the App Creator and Initialise a Firestudio App.

In the Gitpod console run the command `npm i -g @firestudio/create` to install the App Creator.
Then in the console run the command `firestudio init -t basic` to initsilise your project as a Firestudio App.
Firestudio's 'basic' template will be installed along with all dependencies.

### Step 3: Run Development Environment.

At this point you can spin up a dev environment and have a play around.
To start the dev server run the command `npm run dev`.
Gitpod provides two ways to view your running project:
1) In a Preview window.
2) In the Browser.
A popup should appear allowing to choose a way to view the running project.
If you loose the popup window there is an 'Open ports' tab in the console window which provides access to the same options. The project will be running on port `3040`.

### Step 4: Read the Firestudio 'Documentation' included with your template.

Rather than complicating this readme any further, each template comes with its own 'Documentation' which you can use to finish setting up your app and to learn about additional features.
