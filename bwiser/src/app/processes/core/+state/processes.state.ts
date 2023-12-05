import { Process } from '../models';

export type ProcessesState = {
  processes: Process[];
  selectedProcessId: string | null;
};

export const INITIAL_STATE: ProcessesState = {
  processes: [],
  selectedProcessId: null,
};
