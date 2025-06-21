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
    this.authService.login();
  }
}