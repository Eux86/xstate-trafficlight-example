import {
  Machine,
  StateSchema,
  assign,
} from 'xstate';
import {
  onOffMachine,
  IOnOffMachineSchema,
} from './on-off-state-machine';

// ##########################
// For debugging purposes
// ##########################
import { inspect } from '@xstate/inspect';
import { IWalkSignalMachineScheme, walkSignalMachine } from './walk-signal-state-machine';
inspect({
  url: 'https://statecharts.io/inspect',
  iframe: false,
});
// ##########################


export interface IMachineContext {
  preWalking: boolean;
  counter: number,
  max: number,
}

export interface IMachineStateSchema extends StateSchema<IMachineContext> {
  states: {
    red: StateSchema<IMachineContext>;
    yellow: IOnOffMachineSchema;
    green: StateSchema<IMachineContext>;
    walking: IWalkSignalMachineScheme;
  };
}

export type StepperMachineEvents =
  { type: 'allowWalking' }
  | { type: 'myOtherEvent' }

export const trafficlightMachine = Machine<IMachineContext, IMachineStateSchema, StepperMachineEvents>({
  id: 'trafficlight',
  initial: 'red',
  context: {
    preWalking: false,
    counter: 0,
    max: 3,
  },
  states: {
    red: {
      always: {
        cond: (context)=>context.preWalking,
        target: 'walking',
      },
      after: {
        3000: 'green'
      },
      on: {
        allowWalking: {
          actions: assign({
            preWalking: (_) => true,
          }),
        },
      }
    },
    yellow: {
      ...onOffMachine,
      onDone: 'red',
      on: {
        allowWalking: {
          actions: assign({
            preWalking: (_) => true,
          }),
        },
      }
    },
    green: {
      after: {
        2000: 'yellow'
      },
      on: {
        allowWalking: {
          target: 'yellow',
          actions: assign({
            preWalking: (_) => true,
          }),
        },
      }
    },
    walking: {
      ...walkSignalMachine,
      onDone: {
        target: 'green',
        actions: assign({
          preWalking: (_) => false,
        }),
      }
    },
  }
});
