import { Route } from '@angular/router';
import { HomePageComponent } from './pages';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
  },
];
