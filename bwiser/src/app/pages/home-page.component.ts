import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProcessListComponent, TaskListComponent,  } from '../processes';

@Component({
  standalone: true,
  imports: [ProcessListComponent, TaskListComponent],
  template: `
    <section>
      <h2>Processes</h2>
      <bw-process-list/>
    </section>
    <section>
      <h2>Tasks</h2>
      <bw-task-list/>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
