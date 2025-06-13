import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layout/dashboard-layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      // Aquí irían las rutas de profile, favorites, etc.
      // { path: 'profile', component: ProfileComponent },
      
      // Ruta por defecto del dashboard
      { path: '', redirectTo: 'products', pathMatch: 'full' }
    ]
  }
];