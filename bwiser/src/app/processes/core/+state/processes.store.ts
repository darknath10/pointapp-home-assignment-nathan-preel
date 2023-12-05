import { signalStore, withHooks, withState } from '@ngrx/signals';
import { withProcessesMethods } from './processes.methods';
import { withProcessesSelectors } from './processes.selectors';
import { INITIAL_STATE } from './processes.state';

export const ProcessesStore = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withProcessesSelectors(),
  withProcessesMethods(),
  withHooks({
    onInit({ findProcesses }) {
      findProcesses();
    },
  }),
);
