// src/app/modules/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
// No necesitamos DashboardLayoutComponent por ahora

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '', // La ruta raíz de la sección 'app'
    component: DashboardHomeComponent // <-- CORRECTO: Solo un componente
  }
];