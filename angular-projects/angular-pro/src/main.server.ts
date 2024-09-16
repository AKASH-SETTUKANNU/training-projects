import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponentna } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponentna, config);

export default bootstrap;
