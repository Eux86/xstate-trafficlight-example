import React from 'react';
import './App.css';
import { TrafficLightControlled } from './traffic-light-controlled';
import { WalkSignal } from './walk-signal';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TrafficLightControlled />
      </header>
    </div>
  );
}

export default App;
