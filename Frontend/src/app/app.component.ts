// src/app/app.component.ts
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './core/services/auth.service';
import { DashboardHeaderComponent } from './modules/dashboard/components/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DashboardHeaderComponent // <-- Importa el nuevo header
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Hacemos el servicio público para poder usarlo en la plantilla HTML
  public authService = inject(AuthService);
}