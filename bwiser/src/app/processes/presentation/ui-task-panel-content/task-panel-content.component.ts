import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../../core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'bw-task-panel-content',
  standalone: true,
  imports: [DecimalPipe, MatIconModule],
  template: `
    <div class="flex justify-between">
      <div class="h-36 overflow-y-scroll">
        <p>Duration: {{task.durationInDays | number: '1.1-1'}} day(s)</p>
        <p>{{task.description}}</p>
      </div>
      @if (!task.completed) {
        <div class="bg-gray-400 p-3 self-center rounded-l-lg flex flex-col space-y-4">
          <button type="button" class="task-menu-button" (click)="markAsCompletedBtnClick.emit()">
            <mat-icon fontIcon="done"></mat-icon>
          </button>
          <button type="button" class="task-menu-button" (click)="deleteBtnClick.emit()">
            <mat-icon fontIcon="delete"></mat-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .task-menu-button {
      @apply border-none p-0 flex justify-center items-center h-[30px] w-[30px] rounded-full bg-white;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskPanelContentComponent {
  @Input({ required: true }) task!: Task;
  @Output() markAsCompletedBtnClick = new EventEmitter();
  @Output() deleteBtnClick = new EventEmitter();
}
