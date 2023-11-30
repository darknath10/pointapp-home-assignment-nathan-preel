import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProcessListComponent } from '../processes';

@Component({
  standalone: true,
  imports: [ProcessListComponent],
  template: `
    <section>
      <h2>Processes</h2>
      <bw-process-list/>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
