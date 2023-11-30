import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { InMemoryProcessesManager, PROCESS_MANAGER_TOKEN } from './processes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes, withViewTransitions()),
    {
      provide: PROCESS_MANAGER_TOKEN,
      useClass: InMemoryProcessesManager,
    },
  ],
};
