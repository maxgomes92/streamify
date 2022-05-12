import { useState } from 'react'
import './App.css';
import useApi from './helpers/useApi'

function App() {
  const { authorize, loggedIn } = useApi()

  return (
    <div className="App">
      {loggedIn ? (
        <div>Logged in!</div>
      ): (
        <button onClick={authorize}>Login</button>
      )}
    </div>
  );
}

export default App;
