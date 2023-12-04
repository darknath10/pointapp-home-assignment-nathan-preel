import { Process, Step, Task } from '..';

export function updateTaskWithinProcesses(processes: Process[], updatedTask: Task) {
  return processes.map<Process>((process) => {
    const steps = process.steps.map<Step>((step) => {
      const tasks = step.tasks.map((task) => task.id === updatedTask.id ? updatedTask : task);
      return { ...step, tasks };
    });
    return { ...process, steps };
  });
}
