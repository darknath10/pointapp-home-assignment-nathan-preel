import { Observable } from 'rxjs';
import { Process } from '../models';
import { InjectionToken } from '@angular/core';

export interface ProcessesManager {
  find(): Observable<Process[]>;
}

export const PROCESS_MANAGER_TOKEN = new InjectionToken<ProcessesManager>('Processes Manager Token');
