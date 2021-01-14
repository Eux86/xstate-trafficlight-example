import React from 'react';
import { useMachine } from '@xstate/react'
import { trafficlightMachine } from './state-machine';
import { TrafficLight } from '../traffic-light';

export const TrafficLightControlled: React.FunctionComponent = () => {
  const [state] = useMachine(trafficlightMachine, { devTools: true });

  return (
    <TrafficLight
      red={state.matches('red')}
      yellow={state.matches('yellow')}
      green={state.matches('green')}
    />
  )
}