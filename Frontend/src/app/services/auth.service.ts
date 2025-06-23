import { Injectable, signal, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private isBrowser: boolean;
  private apiUrl = environment.apiUrl;

  isLoggedIn = signal<boolean>(false);
  currentUser = signal<any | null>(null);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkTokenOnLoad();
  }

  private checkTokenOnLoad(): void {
    if (!this.isBrowser) return;
    const token = localStorage.getItem('plick_auth_token');
    if (token) {
      this.http.get(`${this.apiUrl}/user`).pipe(
        tap(user => {
          this.isLoggedIn.set(true);
          this.currentUser.set(user);
        })
      ).subscribe();
    }
  }

  login(credentials: any) {
    // AÑADIMOS "return" para devolver el Observable
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('plick_auth_token', response.access_token);
        }
        // Suponiendo que tu API de login devuelve el usuario junto con el token
        // Si no, necesitaremos otra llamada a /user
        this.checkTokenOnLoad(); // Vuelve a verificar el token y actualiza el estado
        this.router.navigate(['/app']);
      })
    );
  }
  logout() {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(() => {
      if (this.isBrowser) localStorage.removeItem('plick_auth_token');
      this.isLoggedIn.set(false);
      this.currentUser.set(null);
      this.router.navigate(['/']);
    });
  }
  
  register(data: any) {
     return this.http.post(`${this.apiUrl}/register`, data);
  }
}