import { assign, MachineConfig, StateSchema } from 'xstate';


export interface IOnOffMachineContext {
  counter: number,
  max: number,
}

export interface IOnOffMachineSchema extends StateSchema<IOnOffMachineContext> {
  states: {
    lightOn: StateSchema<IOnOffMachineContext>;
    lightOff: StateSchema<IOnOffMachineContext>;
    end: StateSchema<IOnOffMachineContext>;
  };
}

export const onOffMachine: MachineConfig<IOnOffMachineContext, IOnOffMachineSchema, any> = {
  initial: 'lightOn',
  states: {
    lightOn: {
      after: {
        1000: [
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
        1000: 'lightOn',
      },
    },
    end: {
      type: 'final',
    }
  },
};