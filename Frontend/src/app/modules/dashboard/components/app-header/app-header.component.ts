import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  isUserMenuOpen = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  onSearch(event: Event): void {
    event.preventDefault();
    const searchInput = (event.target as HTMLFormElement).elements.namedItem('search') as HTMLInputElement;
    console.log('Searching for:', searchInput.value);
    // Aquí se llamaría a un servicio para realizar la búsqueda
  }
}