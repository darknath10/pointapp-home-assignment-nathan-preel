import { Process } from '../models';

export const processToProcessListItemViewModel = ({ id, name, steps }: Process) => {
  const stepsTotal = steps.length;
  const stepsCompleted = steps.reduce((acc, { tasks }) =>
    tasks.every(({ completed }) => completed) ? acc + 1 : acc,
    0,
  );
  const stepsCompletedRatio = (stepsCompleted / stepsTotal) || 0;
  return { id, name, stepsCompletedRatio, stepsCompleted, stepsTotal };
}
