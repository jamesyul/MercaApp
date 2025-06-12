import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email: string = '';

  onSubscribe() {
    if (this.email) {
      console.log('Subscribing email:', this.email);
      // Aquí podrías llamar a un servicio para registrar el email
      alert('¡Gracias por suscribirte!');
      this.email = '';
    }
  }
}