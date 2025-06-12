/*
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // La ruta raíz carga el módulo de la landing page
    path: '',
    loadChildren: () => import('./modules/landing/landing.routes').then(m => m.LANDING_ROUTES)
  },
  {
    // Rutas para autenticación (preparadas para el futuro)
    path: 'auth',
    // Carga perezosa del futuro módulo de autenticación
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  {
    // Rutas para la app principal tras el login (preparadas para el futuro)
    path: 'app',
    // Carga perezosa del futuro dashboard
    loadChildren: () => import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
    // En el futuro, aquí añadirás un AuthGuard para proteger la ruta
    // canActivate: [authGuard] 
  },
  {
    // Redirige cualquier ruta no encontrada a la página de inicio
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];*/

// src/app/app.routes.ts
import { Routes } from '@angular/router';
// PASO 1: Importa el LandingComponent directamente aquí
import { LandingComponent } from './modules/landing/landing.component';

export const routes: Routes = [
  {
    // PASO 2: Reemplaza 'loadChildren' por 'component'
    path: '',
    component: LandingComponent
  },
  // ... (las otras rutas pueden seguir comentadas)
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];