import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css'] // Reutilizamos el CSS
})
export class RegisterComponent {
  authService = inject(AuthService);

  onRegister(event: Event) {
    event.preventDefault();
    // TODO: Aquí llamarías a authService.register() con los datos del formulario.
    // Por ahora, simulamos un login para probar el flujo.
    const fakeCredentials = {
      correo: 'test@plick.es',
      contrasena: 'password123'
    };
    this.authService.login(fakeCredentials).subscribe();
  }
}