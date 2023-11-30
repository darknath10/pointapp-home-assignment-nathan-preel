import { NgClass, PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgressSpinnerWithLabelComponent } from '../../../shared/ui';

type ProcessListItem = { id: number, name: string; stepsCompletedRatio: number; stepsCompleted: number; stepsTotal: number };

@Component({
  selector: 'bw-process-list-item',
  standalone: true,
  imports: [NgClass, PercentPipe, ProgressSpinnerWithLabelComponent],
  template: `
    <div class="process-list-item-base"
      [ngClass]="selected ? 'selected' : 'not-selected'"
      (click)="processSelected.emit(process.id)">
      <bw-progress-spinner-with-label
        [label]="process.stepsCompletedRatio | percent"
        [value]="process.stepsCompletedRatio * 100"/>
      <b>{{process.name}}</b>
      <small class="text-center">{{process.stepsCompleted}}/{{process.stepsTotal}} steps completed so far</small>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    .process-list-item-base {
      @apply rounded-lg h-40 w-28 flex flex-col justify-between items-center bg-white p-4;
    }
    .selected {
      @apply shadow-lg shadow-slate-400;
    }
    .not-selected {
      filter: grayscale(100%);
      opacity: 0.5;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessListItemComponent {
  @Input({ required: true }) process!: ProcessListItem;
  @Input() selected = false;
  @Output() processSelected = new EventEmitter<number>();
}
