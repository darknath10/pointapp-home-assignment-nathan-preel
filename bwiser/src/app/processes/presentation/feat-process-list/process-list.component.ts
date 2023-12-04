import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProcessListItemComponent } from '../ui-process-list-item';
import { ProcessesStore } from '../../core';

@Component({
  selector: 'bw-process-list',
  standalone: true,
  imports: [ProcessListItemComponent],
  template: `
    <div class="flex flex-nowrap overflow-x-scroll">
      @for (process of store.processList(); track process.id) {
        <bw-process-list-item class="mx-4"
          [process]="process"
          [selected]="process.id === store.selectedProcessId()"
          (processSelected)="store.setSelectedProcess($event)"
        />
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessListComponent {
  readonly store = inject(ProcessesStore);
}
