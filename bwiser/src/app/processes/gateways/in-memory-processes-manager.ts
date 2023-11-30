import { of, switchMap, timer } from 'rxjs';
import { Process, ProcessesManager } from '../core';


export class InMemoryProcessesManager implements ProcessesManager {
  private processes: Process[] = [
    {
      id: 1,
      name: 'Process 1',
      steps: [
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Process 2',
      steps: [
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
      ],
    },
    {
      id: 3,
      name: 'Process 3',
      steps: [
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
      ],
    },
    {
      id: 4,
      name: 'Process 4',
      steps: [
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
      ],
    },
    {
      id: 5,
      name: 'Process 5',
      steps: [
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: true },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
        {
          tasks: [
            { completed: false },
          ],
        },
      ],
    },
  ];
  
  find() {
    return timer(555).pipe(
      switchMap(() => of(this.processes)),
    );
  }
}
