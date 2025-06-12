// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- ¡MUY IMPORTANTE!
import { HeaderComponent } from './layout/header/header.component'; // <-- ¡IMPORTANTE!
import { FooterComponent } from './layout/footer/footer.component'; // <-- ¡IMPORTANTE!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // <-- Debe estar aquí
    HeaderComponent,   // <-- Debe estar aquí
    FooterComponent    // <-- Debe estar aquí
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Plick';
}