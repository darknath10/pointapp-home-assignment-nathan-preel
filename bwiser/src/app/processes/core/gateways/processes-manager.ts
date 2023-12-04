import { Observable } from 'rxjs';
import { Process, Task } from '../models';
import { InjectionToken } from '@angular/core';

export interface ProcessesManager {
  find(): Observable<Process[]>;
  markTaskAsCompleted(taskId: string): Observable<Task>;
  removeTask(taskId: string): Observable<void>;
}

export const PROCESS_MANAGER_TOKEN = new InjectionToken<ProcessesManager>('Processes Manager Token');
