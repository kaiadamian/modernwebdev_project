## About Our Residential Life App - Campus Connect
PROBLEM: It can be difficult for students to stay up-to-date with dorm events, as they are usually only advertised on individual dorms’ Instagram pages, and having to follow 30+ dorm pages is unrealistic.
In addition, Hall Presidents can find it hard to advertise dorm events to larger audiences.

SOLUTION: Campus Connect! Hall Presidents can promote their events to the entire campus community, increase engagement, and earn points toward Hall of the Year! Campus Connect is a centralized location for every dorm event occurring to make students never miss one. SAO is able to login as admin and communicate with HPC to ensure events are approved or answer questions as they come in.

## Built With
React, Material UI, Vite

## Getting Started
* First, unzip the folder and open the unzipped folder in VSCode
* Prerequisites
  * npm
    ```sh
    npm install
    ```
  * after, you may have to run
    ```sh
    npm audit fix
    ```
## Running 
There are 2 ways to access this webpage
* running locally from the root of the 
    ```sh
    npm run dev 
    ```
* live link (hosted through netlify)
  ```https://oliviakaia-modernwebdev-final.netlify.app/auth/login```

## Sending a message to the current user as Admin
If someone is logged in as a user on our website and they have sent a message in the chatbox, 
in order to send a message to that user as the admin, complete the following steps:
* log on to our parse database and go to the 'Message' class
* copy the 'sender' pointer of the user's new message
* add a row, and paste that pointer into the 'receiver' column
* then, type the message you want to reply in the 'text' column
* press the green 'Add' button to confirm addition, and your new message will pop up in the user's chatbox!

*NOTE* This process is necessary since LiveQuery was behind a paywall so we had to implement the chat using polling!

## TO SEE MESSAGES SENT BETWEEN A USER AND ADMIN
* Log in with email = kdamian@nd.edu, password = 12345 to see that our chat box works!

## Collaborators
Kaia Damian and Olivia Zino

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


