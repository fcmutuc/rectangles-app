import React from 'react';
import Instructions from '../Instructions/Instructions.js';
import Actions from '../Actions/Actions.js';
import './App.css';

function App() {
  return (
    <div className="container">
      <h2>Rectangles App</h2>
      <Instructions />
      <Actions />
    </div>
  );
}

export default App;
