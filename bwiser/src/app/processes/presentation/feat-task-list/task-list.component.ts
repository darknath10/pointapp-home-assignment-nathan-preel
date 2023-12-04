import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProcessesStore } from '../../core';
import { TaskPanelHeaderComponent } from '../ui-task-panel-header';
import { TaskPanelContentComponent } from '../ui-task-panel-content';

@Component({
  selector: 'bw-task-list',
  standalone: true,
  imports: [
    CdkAccordionModule,
    NgClass,
    TaskPanelContentComponent,
    TaskPanelHeaderComponent,
  ],
  template: `
    <div class="h-80 px-3 overflow-y-scroll">
      <cdk-accordion>
        @for (task of store.selectedProjectTaskList(); track task.id) {
          <cdk-accordion-item #accItem="cdkAccordionItem">
            <div class="mb-3 p-2 bg-white rounded-r-xl shadow-md">
              <bw-task-panel-header [task]="task" (click)="accItem.toggle()"/>
              <div [ngClass]="accItem.expanded ? 'h-40' : 'h-0'" class="transition-[height]">
                @if (accItem.expanded) {
                  <bw-task-panel-content class="mt-3"
                    [task]="task"
                    (markAsCompletedBtnClick)="store.markTaskAsCompleted({ taskId: task.id })"
                    (deleteBtnClick)="store.removeTask({ taskId: task.id })"
                  />
                }
              </div>
            </div>
          </cdk-accordion-item>
        }
      </cdk-accordion>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  readonly store = inject(ProcessesStore);
}
