import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from Express backend
    fetch('/api/message')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;