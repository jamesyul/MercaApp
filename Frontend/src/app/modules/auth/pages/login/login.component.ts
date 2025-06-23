import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; // <-- AÑADIR ESTA IMPORTACIÓN

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  
  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]]
  });

  onLogin() { // <-- Quitamos el parámetro "event"
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => console.log('Login exitoso! Redirigiendo...'),
        // Tipamos "err" para solucionar el error de 'any' implícito
        error: (err: HttpErrorResponse) => {
          console.error('Error en el login:', err);
          // Mostramos el mensaje de error que viene de Laravel
          alert('Error en el login: ' + (err.error?.message || 'Credenciales incorrectas.'));
        }
      });
    }
  }
}