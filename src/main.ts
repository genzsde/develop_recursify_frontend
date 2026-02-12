import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

// Merge routing into appConfig providers
const bootstrapConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes)
  ]
};

bootstrapApplication(App, bootstrapConfig)
  .catch((err) => console.error(err));
