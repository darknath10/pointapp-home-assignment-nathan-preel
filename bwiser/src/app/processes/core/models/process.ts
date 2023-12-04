import { Step } from './step';

export type Process = {
  id: string;
  name: string;
  steps: Step[];
};
