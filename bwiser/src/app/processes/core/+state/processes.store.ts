import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { map, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { PROCESS_MANAGER_TOKEN } from '../gateways';
import { Process } from '../models';
import { processToProcessListItemViewModel, removeTaskWithinProcesses, updateTaskWithinProcesses } from '../utils';

type State = {
  processes: Process[];
  selectedProcessId: string | null;
};

const INITIAL_STATE: State = {
  processes: [],
  selectedProcessId: null,
};

export const ProcessesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed(({ processes, selectedProcessId }) => {
    const processList = computed(() => processes().map(processToProcessListItemViewModel));
    const selectedProcess = computed(() => processes().find(({ id }) => id === selectedProcessId()));
    const selectedProjectTaskList = computed(() => selectedProcess()?.steps.flatMap(({ tasks }) => tasks) || []);
    return { processList, selectedProcess, selectedProjectTaskList };
  }),
  withMethods((state) => {
    const processesManager = inject(PROCESS_MANAGER_TOKEN);

    return {
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
    };
  }),
  withHooks({
    onInit({ findProcesses }) {
      findProcesses();
    },
  }),
);
