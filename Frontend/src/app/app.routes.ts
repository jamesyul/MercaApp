// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LandingComponent } from './modules/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  // { // Dejamos preparada la ruta de autenticación para el futuro
  //   path: 'auth',
  //   loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  // },
  { // ¡DESCOMENTAMOS ESTA RUTA!
    path: 'app',
    loadChildren: () => import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];