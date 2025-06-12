// src/app/modules/landing/landing.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

export const LANDING_ROUTES: Routes = [
  {
    path: '', // La ruta raíz del módulo (que es la raíz de la app)
    component: LandingComponent
  }
];