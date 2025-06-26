// src/app/core/services/auth.service.ts
import { Injectable, signal, PLATFORM_ID, Inject, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap, catchError, of } from 'rxjs';

// Definimos una interfaz para el usuario para tener un tipado más fuerte
export interface User {
  idusuario: number;
  nombre: string;
  apellido: string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyección de dependencias moderna
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Señales para gestionar el estado de forma reactiva en toda la app
  public isLoggedIn = signal<boolean>(false);
  public currentUser = signal<User | null>(null);

  private isBrowser: boolean;
  private apiUrl = environment.apiUrl;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.checkTokenOnLoad();
  }

  /**
   * Al iniciar el servicio, comprueba si existe un token en localStorage.
   * Si existe, intenta validar ese token contra la API para obtener los datos del usuario.
   */
  private checkTokenOnLoad(): void {
    if (!this.isBrowser) {
      return; // No hacer nada en el servidor
    }
    
    const token = localStorage.getItem('plick_auth_token');
    if (token) {
      this.http.get<User>(`${this.apiUrl}/user`).pipe(
        tap(user => {
          this.isLoggedIn.set(true);
          this.currentUser.set(user);
        }),
        catchError(() => {
          // Si el token es inválido, lo limpiamos y reseteamos el estado
          this.logoutUserOnly();
          return of(null); // Retornamos un observable nulo para que la cadena continúe
        })
      ).subscribe();
    }
  }

  /**
   * Envía las credenciales al backend de Laravel.
   * Si el login es exitoso, guarda el token y actualiza el estado.
   * @param credentials Objeto con { correo, contrasena }
   * @returns Un Observable que el componente puede suscribir.
   */
  public login(credentials: any) {
    // La palabra clave "return" es VITAL para que el componente pueda suscribirse
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('plick_auth_token', response.access_token);
        }
        // Después de guardar el token, volvemos a llamar a checkTokenOnLoad
        // para que traiga los datos del usuario y actualice las señales.
        this.checkTokenOnLoad();
        this.router.navigate(['/app']);
      })
    );
  }

  /**
   * Envía los datos de registro al backend.
   * @param data Objeto con { nombre, correo, contrasena }
   * @returns Un Observable.
   */
  public register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  /**
   * Notifica al backend para invalidar el token y luego limpia el estado local.
   */
  public logout(): void {
    // Primero intentamos hacer logout en el backend para invalidar el token
    this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      // catchError es por si el token ya expiró o es inválido, aun así queremos limpiar el frontend
      catchError(() => of(null)) 
    ).subscribe(() => {
      this.logoutUserOnly(); // Limpiamos el estado del frontend
    });
  }
  
  /**
   * Método privado para limpiar el estado del frontend sin llamar a la API.
   * Útil para cuando el token es inválido o después de un logout exitoso.
   */
  private logoutUserOnly(): void {
    if (this.isBrowser) {
      localStorage.removeItem('plick_auth_token');
    }
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/']);
  }
}