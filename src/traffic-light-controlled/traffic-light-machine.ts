import {
  Machine,
  StateSchema,
} from 'xstate';
import {
  onOffMachine,
  IOnOffMachineSchema,
  IOnOffMachineContext,
} from './on-off-state-machine';

// ##########################
// For debugging purposes
// ##########################
import { inspect } from '@xstate/inspect';
inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});
// ##########################


export interface IMachineContext extends IOnOffMachineContext { }

export interface IMachineStateSchema extends StateSchema<IMachineContext> {
  states: {
    red: StateSchema<IMachineContext>;
    yellow: IOnOffMachineSchema;
    green: StateSchema<IMachineContext>;
  };
}

export type StepperMachineEvents =
  { type: 'myEvent' }
  | { type: 'myOtherEvent' }

export const trafficlightMachine = Machine<IMachineContext, IMachineStateSchema, StepperMachineEvents>({
  id: 'trafficlight',
  initial: 'red',
  context: {
    counter: 0,
    max: 3,
  },
  states: {
    red: {
      after: {
        1000: 'green'
      }
    },
    yellow: {
      ...onOffMachine,
      onDone: 'red',
    },
    green: {
      after: {
        1000: 'yellow'
      }
    },
  }
});
