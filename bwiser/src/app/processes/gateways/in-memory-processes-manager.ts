import { of, switchMap, throwError, timer } from 'rxjs';
import { v4 } from 'uuid';
import { Process, ProcessesManager, Step, Task } from '../core';

//#region Helper functions to generate Processes, Steps and Tasks
function generateTask(processIndex: number, stepIndex: number, taskIndex: number): Task {
  const id = v4();
  const completed = Math.random() >= 0.5;
  const name = `Process ${processIndex + 1} / Step ${stepIndex + 1} / Task ${taskIndex + 1}`;
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue neque elit, sed posuere ligula sodales eget. Morbi tempus laoreet nisi nec sodales. Sed tristique faucibus rutrum. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse odio odio, egestas id mauris at, ullamcorper lacinia dui. Cras a purus neque. Curabitur hendrerit maximus feugiat. Praesent aliquam massa id elementum finibus.';
  const durationInDays = Math.random() * 32;
  return { id, completed, name, description, durationInDays };
}

function generateStep(processIndex: number, stepIndex: number): Step {
  const id = v4();
  const tasksLength = Math.floor(Math.random() * 12 + 1);
  const tasks = new Array(tasksLength).fill(undefined).map<Task>((_, index) => generateTask(processIndex, stepIndex, index));
  return { id, tasks };
}

function generateProcess(processIndex: number): Process {
  const id = v4();
  const name = `Process ${processIndex + 1}`;
  const stepsLength = Math.floor(Math.random() * 12 + 1);
  const steps = new Array(stepsLength).fill(undefined).map<Step>((_, index) => generateStep(processIndex, index));
  return { id, name, steps };
}

function generateProcesses(size: number): Process[] {
  return new Array(size).fill(undefined).map<Process>((_, index) => generateProcess(index));
}
//#endregion

export class InMemoryProcessesManager implements ProcessesManager {
  private processes = generateProcesses(5);
  
  find() {
    return timer(555).pipe(
      switchMap(() => of(this.processes)),
    );
  }

  markTaskAsCompleted(taskId: string) {
    const tasks = this.processes.flatMap(({ steps }) => steps.flatMap(({ tasks }) => tasks));
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);
    if (taskIndex === -1) {
      return throwError(() => 'Task not found');
    }
    tasks.splice(taskIndex, 1, {...tasks[taskIndex], completed: true});
    return of({...tasks[taskIndex]});
  }

  removeTask(taskId: string) {
    const tasks = this.processes.flatMap(({ steps }) => steps.flatMap(({ tasks }) => tasks));
    const taskIndex = tasks.findIndex(({ id }) => id === taskId);
    if (taskIndex === -1) {
      return throwError(() => 'Task not found');
    }
    tasks.splice(taskIndex, 1);
    return of(undefined);
  }
}
