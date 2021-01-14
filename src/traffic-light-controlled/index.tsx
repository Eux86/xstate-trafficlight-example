import React from 'react';
import { useMachine } from '@xstate/react'
import { trafficlightMachine } from './traffic-light-machine';
import { TrafficLight } from '../traffic-light';
import { WalkSignal } from '../walk-signal';
import './index.css';

export const TrafficLightControlled: React.FunctionComponent = () => {
  const [state, send] = useMachine(trafficlightMachine, { devTools: true });

  return (
    <>
      <TrafficLight
        red={['red', 'walking'].some(state.matches)}
        yellow={state.matches('yellow.lightOn')}
        green={state.matches('green')}
      />
      <WalkSignal
        red={!state.matches('walking.green')}
        green={state.matches('walking.green')}
      />
      <button
        className="walk-button"
        type="button"
        onClick={() => send('allowWalking')}
      >Walk</button>
    </>
  )
}