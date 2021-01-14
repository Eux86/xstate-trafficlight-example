import {
  Machine,
  StateSchema,
} from 'xstate';

// ##########################
// For debugging purposes
// ##########################
import { inspect } from '@xstate/inspect';
inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});
// ##########################


export interface IMachineContext { }

export interface IMachineStateSchema extends StateSchema<IMachineContext> {
  states: {
    red: StateSchema<IMachineContext>;
    yellow: StateSchema<IMachineContext>;
    green: StateSchema<IMachineContext>;
  };
}

export type StepperMachineEvents =
  { type: 'myEvent' }
  | { type: 'myOtherEvent' }



export const trafficlightMachine = Machine<IMachineContext, IMachineStateSchema, StepperMachineEvents>({
  id: 'trafficlight',
  initial: 'red',
  context: { },
  states: {
    red: {
      after: {
        2000: 'green'
      }
    },
    yellow: {
      after: {
        2000: 'red'
      }
    },
    green: {
      after: {
        2000: 'yellow'
      }
    },
  }
});
