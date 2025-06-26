// src/app/modules/landing/components/hero/hero.component.ts
import { Component, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  // La lógica de parallax y detección de browser se puede añadir aquí si se desea,
  // pero para una versión inicial limpia, no es estrictamente necesaria.
  authService = inject(AuthService);
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

    // NUEVO MÉTODO
  simulateLogin() {
    const fakeCredentials = {
      correo: 'test@plick.es', // Usa un correo que exista en tu BD para que la API responda bien
      contrasena: 'password123'  // La contraseña que corresponda
    };
    this.authService.login(fakeCredentials).subscribe({
      next: () => console.log('Simulación de login exitosa.'),
      error: (err) => console.error('Fallo en la simulación de login', err)
    });
  }
}

