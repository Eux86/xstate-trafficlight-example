import React from 'react';
import './App.css';
import { TrafficLight } from './traffic-light';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TrafficLight yellow />
      </header>
    </div>
  );
}

export default App;
