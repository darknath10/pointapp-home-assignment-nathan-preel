import { inject } from '@angular/core';
import { patchState, signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { PROCESS_MANAGER_TOKEN } from '../gateways';
import { removeTaskWithinProcesses, updateTaskWithinProcesses } from '../utils';
import { ProcessesState } from './processes.state';

export function withProcessesMethods() {
  return signalStoreFeature(
    { state: type<ProcessesState>() },
    withMethods((state, processesManager = inject(PROCESS_MANAGER_TOKEN)) => ({
      setSelectedProcess: (selectedProcessId: string) => patchState(state, { selectedProcessId }),
      findProcesses: rxMethod<void>(
        pipe(
          switchMap(() => processesManager.find().pipe(
            tap((processes) => patchState(state, { processes, selectedProcessId: processes[0]?.id || null })),
          )),
        ),
      ),
      markTaskAsCompleted: rxMethod<{taskId: string}>(
        pipe(
          mergeMap(({ taskId }) =>
            processesManager.markTaskAsCompleted(taskId).pipe(
              map((updatedTask) => updateTaskWithinProcesses(state.processes(), updatedTask)),
              tap((processes) => patchState(state, { processes })),
            ),
          ),
        ),
      ),
      removeTask: rxMethod<{taskId: string}>(
        pipe(
          mergeMap(({ taskId }) =>
            processesManager.removeTask(taskId).pipe(
              map(() => removeTaskWithinProcesses(state.processes(), taskId)),
              tap((processes) => patchState(state, { processes })),
            ),
          ),
        ),
      ),
    })),
  );
}
