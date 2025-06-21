// src/app/modules/dashboard/components/dashboard-header/dashboard-header.component.ts
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent {
  authService = inject(AuthService);
  isDropdownOpen = false; // Estado del desplegable

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  onSearch(event: Event) {
    event.preventDefault();
    const input = (event.target as HTMLFormElement).querySelector('input');
    console.log('Buscando:', input?.value);
    // Aquí irá la lógica para buscar productos
  }

  logout() {
    this.authService.logout();
  }
}


