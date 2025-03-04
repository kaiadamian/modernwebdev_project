import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as Env from './environments.js'
import Parse from 'parse'
import Components from './Components/Components.jsx'

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  // const [status, setStatus] = useState('Checking Parse Server...');

  // useEffect(() => {
  //   const checkParseConnection = async () => {
  //     try {
  //       // Test if Parse is connected by making a simple query
  //       const TestObject = Parse.Object.extend('Course');
  //       const query = new Parse.Query(TestObject);
  //       const result = await query.first(); // Fetch the first object from the class

  //       if (result) {
  //         setStatus(`Connected to Parse Server ✅ Found object: ${result.get('name')}`);
  //       } else {
  //         setStatus('Connected to Parse Server ✅ No objects found.');
  //       }
  //     } catch (error) {
  //       setStatus(`❌ Error: ${error.message}`);
  //     }
  //   };

  //   checkParseConnection();
  // }, []);

  return (
    // <div>
    //   <h1>Parse Server Test</h1>
    //   <p>{status}</p>
      <Components />
    // </div>
  )

}

export default App
