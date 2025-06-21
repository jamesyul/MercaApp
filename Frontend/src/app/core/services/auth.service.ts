// src/app/core/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usamos una Señal de Angular para gestionar el estado de forma reactiva.
  // Empieza como 'false' (no logueado).
  isLoggedIn = signal<boolean>(false);

  constructor(private router: Router) { }

  // Simula un inicio de sesión
  login(): void {
    this.isLoggedIn.set(true);
    this.router.navigate(['/app']); // Redirige al dashboard
  }

  // Simula un cierre de sesión
  logout(): void {
    this.isLoggedIn.set(false);
    this.router.navigate(['/']); // Redirige a la landing page
  }
}