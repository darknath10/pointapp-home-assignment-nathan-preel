import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'bw-layout',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <div class="flex flex-col h-full">
      <mat-toolbar class="shadow-md">
        <ng-content select="[toolbar-content]"/>
      </mat-toolbar>
      <section class="flex-grow">
        <ng-content select="[main-content]"/>
      </section>
      <ng-content select="[footer-content]"/>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
