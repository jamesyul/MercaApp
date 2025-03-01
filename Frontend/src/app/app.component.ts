import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component'; // Ajusta la ruta si es diferente
import { HeroComponent } from './hero/hero.component';       // Ajusta la ruta si es diferente
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  //imports: [RouterOutlet],
  standalone: true,
  imports: [HeaderComponent, HeroComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
