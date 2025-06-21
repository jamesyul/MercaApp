// src/app/core/services/auth.service.ts
import { Injectable, signal, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkTokenOnLoad();
  }

  private checkTokenOnLoad(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('plick_auth_token');
      if (token) {
        this.isLoggedIn.set(true);
      }
    }
  }

  // Simula un inicio de sesión
  login(): void {
    // TODO: Aquí irá la llamada HTTP a Laravel con email y contraseña.
    // Si la llamada es exitosa, Laravel devolverá un token.
    console.log('Simulando llamada a API de Login...');
    setTimeout(() => {
      const fakeToken = 'abcdef123456'; // Token falso devuelto por Laravel
      if (this.isBrowser) {
        localStorage.setItem('plick_auth_token', fakeToken);
      }
      this.isLoggedIn.set(true);
      this.router.navigate(['/app']); // Redirige al dashboard
    }, 1000);
  }

  // Simula un cierre de sesión
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('plick_auth_token');
    }
    this.isLoggedIn.set(false);
    this.router.navigate(['/']); // Redirige a la landing page
  }
}