Collaborators: Kaia Damian and Olivia Zino

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Sending a message to the current user as Admin
If someone is logged in as a user on our website and they have sent a message in the chatbox, 
in order to send a message to that user as the admin, complete the following steps:
* log on to our parse database and go to the 'Message' class
* copy the 'sender' pointer of the user's new message
* add a row, and paste that pointer into the 'receiver' column
* then, type the message you want to reply in the 'text' column
* press the green 'Add' button to confirm addition, and your new message will pop up in the user's chatbox!

## TO SEE MESSAGES SENT BETWEEN A USER AND ADMIN
* log in with email= kdamian@nd.edu, password = 12345 to see that our chat box works!
