// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // <-- ¡Paso 1: Importa la configuración!
import { AppComponent } from './app/app.component';

// Paso 2: Pasa el objeto 'appConfig' como segundo argumento a bootstrapApplication.
// Esto le da a Angular la "caja de herramientas" completa que definimos.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));