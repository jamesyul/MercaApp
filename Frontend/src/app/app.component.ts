// src/app/app.component.ts

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Componentes del Layout General
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

// Componentes del Dashboard y Modal
import { DashboardHeaderComponent } from './modules/dashboard/components/dashboard-header/dashboard-header.component';
import { ProductDetailModalComponent } from './modules/dashboard/components/product-detail-modal/product-detail-modal.component';

// Servicios Core
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // Aquí importamos todos los componentes que se usarán directamente en app.component.html
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent,
    ProductDetailModalComponent
  ],
  templateUrl: './app.component.html',
  // No necesita styleUrls porque los estilos son de los componentes hijos
})
export class AppComponent {
  // Inyectamos el servicio de autenticación y lo hacemos público para que la plantilla
  // (app.component.html) pueda acceder a su estado `isLoggedIn`.
  public authService = inject(AuthService);

  // El título no es estrictamente necesario, pero es una buena práctica
  title = 'Plick';
}