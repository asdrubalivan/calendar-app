# Calendar App

## Quick start

Either go to [netlify](https://friendly-pike-c848c6.netlify.com/) or run the following:

1. `yarn install`
1. `yarn start`.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Runs the tests for the app

### `yarn build`

Builds the app for production to the `build` folder.

## Deployed versions

A deployed version from the app is deployed [here](https://friendly-pike-c848c6.netlify.com/)

## Instructions of use

To add a reminder on the main page click on the button *Add Reminder*.
Fill the fields:

1. Reminder
1. Color (Use an hexadecimal code for the color)
1. Date

Click on the *Add new reminder button*

Once a reminder is created, it will be shown in the calendar in the date that this reminder was configured. To edit, simply click on the reminder and edit the fields mentioned above as you wish.

## Folder structure

```
.
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── README.md
├── src
│   ├── App.js                                 // Global component
│   ├── components
│   │   ├── addreminderform.js
│   │   ├── calendar.js
│   │   ├── editreminderform.js
│   │   ├── reminderform.js
│   │   └── __tests__
│   │       ├── addreminderform.test.js        // Tests for add reminder component
│   │       └── editreminderform.test.js       // Tests for edit reminder component
│   ├── globalstyle.js                         // Used to insert global styles in the app
│   ├── index.js
│   ├── logo.svg
│   ├── reducers
│   │   ├── actions.js                         // Common actions
│   │   ├── calendar.js                        // Calendar reducer
│   │   ├── index.js                           // Global reducer
│   │   ├── reminder.js                        // Reminder reducer
│   │   └── __tests__
│   │       ├── date.test.js
│   │       ├── reminder.test.js
│   │       └── __snapshots__
│   │           └── date.test.js.snap
│   ├── selectors                              // Calculates props based on redux status
│   │   └── calendar.js
│   ├── serviceWorker.js
│   ├── setupTests.js
│   └── utils
│       ├── date.js
│       └── reminderform.js
└── yarn.lock

```
