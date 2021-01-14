import React from 'react';
import { useMachine } from '@xstate/react'
import { trafficlightMachine } from './traffic-light-machine';
import { TrafficLight } from '../traffic-light';

export const TrafficLightControlled: React.FunctionComponent = () => {
  const [state] = useMachine(trafficlightMachine, { devTools: true });

  return (
    <TrafficLight
      red={state.matches('red')}
      yellow={state.matches('yellow.lightOn')}
      green={state.matches('green')}
    />
  )
}