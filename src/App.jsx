import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import * as Env from './environments.js'
import Parse from 'parse'
import Components from './Components/Components.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* initialize Parse */
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return <Components />
}

export default App
