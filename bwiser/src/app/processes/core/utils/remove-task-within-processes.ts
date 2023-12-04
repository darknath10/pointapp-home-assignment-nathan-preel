import { Process, Step } from '../models';

export function removeTaskWithinProcesses(processes: Process[], taskId: string) {
  return processes.map<Process>((process) => {
    const steps = process.steps.map<Step>((step) => {
      const tasks = step.tasks.filter(({ id }) => id !== taskId);
      return { ...step, tasks };
    });
    return { ...process, steps };
  });
}
