import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  // Reutiliza los estilos del login
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent {
  passwordFieldType: string = 'password';

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  onRegister(): void {
    // Aquí irá la lógica para el registro
    console.log('Register form submitted');
  }
}