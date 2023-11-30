import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { PROCESS_MANAGER_TOKEN } from '../gateways';
import { Process } from '../models';

type State = {
  processes: Process[];
  selectedProcessId: number;
};

const INITIAL_STATE: State = {
  processes: [],
  selectedProcessId: 1,
};

export const ProcessesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed(({ processes }) => ({
    processList: computed(() => processes().map(({ id, name, steps }) => {
      const stepsTotal = steps.length;
      const stepsCompleted = steps.reduce((acc, { tasks }) =>
        tasks.every(({ completed }) => completed) ? acc + 1 : acc,
        0,
      );
      const stepsCompletedRatio = (stepsCompleted / stepsTotal) || 0;
      return { id, name, stepsCompletedRatio, stepsCompleted, stepsTotal };
    })),
  })),
  withMethods((state) => {
    const processesManager = inject(PROCESS_MANAGER_TOKEN);

    return {
      findProcesses: rxMethod<void>(
        pipe(
          switchMap(() =>
            processesManager.find().pipe(
              tap((processes) => patchState(state, { processes })),
            ),
          ),
        ),
      ),
      setSelectedProcess: (selectedProcessId: number) => {
        patchState(state, { selectedProcessId });
      },
    };
  }),
  withHooks({
    onInit({ findProcesses }) {
      findProcesses();
    },
  }),
);
