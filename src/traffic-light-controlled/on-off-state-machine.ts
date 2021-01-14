import { assign, MachineConfig, StateSchema } from 'xstate';
import { IMachineContext } from './traffic-light-machine';


export interface IOnOffMachineSchema extends StateSchema<IMachineContext> {
  states: {
    lightOn: StateSchema<IMachineContext>;
    lightOff: StateSchema<IMachineContext>;
    end: StateSchema<IMachineContext>;
  };
}

export const onOffMachine: MachineConfig<IMachineContext, IOnOffMachineSchema, any> = {
  initial: 'lightOn',
  states: {
    lightOn: {
      after: {
        500: [
          {
            target: 'lightOff',
            actions: assign({ counter: (context) => context.counter + 1 }),
            cond: (context) => context.counter < context.max,
          },
          {
            target: 'end',
            actions: assign({ counter: (_) => 0 })
          },
        ]
      }
    },
    lightOff: {
      after: {
        500: 'lightOn',
      },
    },
    end: {
      type: 'final',
    }
  },
};