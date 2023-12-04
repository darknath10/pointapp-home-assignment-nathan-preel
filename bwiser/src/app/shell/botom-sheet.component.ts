import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'bw-bottom-sheet',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgClass],
  template: `
    @if (expanded()) {
      <div id="mask"></div>
    }
    <div id="bottom-sheet-container" [ngClass]="expanded() ? 'h-80' : 'h-14'">
      <button type="button" mat-fab color="primary" (click)="expanded.set(!expanded())">
        <mat-icon [fontIcon]="expanded() ? 'close' : 'lightbulb'"/>
      </button>
      @if (expanded()) {
        <p class="text-white px-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In congue neque elit, sed posuere ligula sodales eget. Morbi tempus laoreet nisi nec sodales. Sed tristique faucibus rutrum. In hac habitasse platea dictumst. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Suspendisse odio odio, egestas id mauris at, ullamcorper lacinia dui. Cras a purus neque. Curabitur hendrerit maximus feugiat. Praesent aliquam massa id elementum finibus.</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    button {
      top: -28px;
      left: calc(50% - 28px);
    }
    #mask {
      @apply w-screen h-screen absolute top-0 left-0 bg-transparent z-10;
      backdrop-filter: blur(2px);
    }
    #bottom-sheet-container {
      @apply bg-black transition-[height] fixed bottom-0 left-0 right-0 z-20;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomSheetComponent {
  readonly expanded = signal(false);
}
