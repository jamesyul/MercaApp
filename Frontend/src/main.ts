
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Asegúrate de tener este archivo

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // otros providers...
  ]
}).catch(err => console.error(err));