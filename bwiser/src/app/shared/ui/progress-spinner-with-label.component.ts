import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'bw-progress-spinner-with-label',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="relative rounded-full bg-gray-400">
      <span id="label">{{label}}</span>
      <mat-progress-spinner
        color="primary"
        mode="determinate"
        diameter="65"
        strokeWidth="10"
        [value]="value"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
    #label {
      @apply absolute w-[45px] h-[45px] m-[10px] text-center leading-[45px] bg-black text-white rounded-full;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressSpinnerWithLabelComponent {
  @Input({ required: true }) label!: string | null;
  @Input({ required: true }) value!: number;
}
