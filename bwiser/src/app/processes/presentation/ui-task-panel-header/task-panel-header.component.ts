import { DecimalPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../core';

@Component({
  selector: 'bw-task-panel-header',
  standalone: true,
  imports: [DecimalPipe, MatIconModule, NgClass],
  template: `
    <div class="flex justify-between items-center">
      <span [ngClass]="task.completed ? 'font-normal' : 'font-semibold'">{{task.name}}</span>
      <span class="rounded-full flex justify-center items-center h-[30px] w-[30px]" [ngClass]="task.completed ? 'bg-black' : 'bg-lime-500'">
        @if (task.completed) {
          <mat-icon fontIcon="done" color="primary"></mat-icon>
        } @else {
          <span>{{task.durationInDays | number: '2.0-0'}}</span>
        }
      </span>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPanelHeaderComponent {
  @Input({ required: true }) task!: Task;
}
