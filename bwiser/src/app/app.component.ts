import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'bw-root',
  template: `<h1>Welcome bwiser</h1>
    <router-outlet></router-outlet>`,
  styles: ``,
})
export class AppComponent {}
