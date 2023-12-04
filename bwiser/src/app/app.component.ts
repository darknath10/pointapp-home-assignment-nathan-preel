import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomSheetComponent, LayoutComponent } from './shell';

@Component({
  standalone: true,
  imports: [BottomSheetComponent, LayoutComponent, RouterModule],
  selector: 'bw-root',
  template: `
    <bw-layout>
      <h1 toolbar-content>Welcome to B-Wiser</h1>
      <router-outlet main-content/>
      <bw-bottom-sheet footer-content/>
    </bw-layout>
  `,
  styles: ``,
})
export class AppComponent {}
