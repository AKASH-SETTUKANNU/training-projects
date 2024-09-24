import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponentna } from './app/app.component';

bootstrapApplication(AppComponentna, appConfig)
  .catch((err) => console.error(err));
