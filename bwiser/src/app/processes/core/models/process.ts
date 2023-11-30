import { Step } from './step';

export type Process = {
  id: number;
  name: string;
  steps: Step[];
};
