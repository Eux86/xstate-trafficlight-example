import { MachineConfig, StateSchema } from "xstate";
import { IMachineContext } from "./traffic-light-machine";

export interface IWalkSignalMachineScheme extends StateSchema<IMachineContext> {
  states: {
    green: StateSchema<IMachineContext>;
    red: StateSchema<IMachineContext>;
  };
}


export const walkSignalMachine: MachineConfig<IMachineContext, IWalkSignalMachineScheme, any> = {
  id: 'walkSignal',
  initial: 'green',
  states: {
    green: {
      after: {
        5000: 'red'
      }
    },
    red: {
      type: 'final'
    },
  }
};
