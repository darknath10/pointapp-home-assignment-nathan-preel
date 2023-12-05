import { computed } from '@angular/core'
import { signalStoreFeature, type, withComputed } from '@ngrx/signals'
import { processToProcessListItemViewModel } from '../utils'
import { ProcessesState } from './processes.state'

export function withProcessesSelectors() {
  return signalStoreFeature(
    { state: type<ProcessesState>()},
    withComputed(({ processes, selectedProcessId }) => {
      const processList = computed(() => processes().map(processToProcessListItemViewModel));
      const selectedProcess = computed(() => processes().find(({ id }) => id === selectedProcessId()));
      const selectedProjectTaskList = computed(() => selectedProcess()?.steps.flatMap(({ tasks }) => tasks) || []);
      return { processList, selectedProcess, selectedProjectTaskList };
    }),
  );
}
