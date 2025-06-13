import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from '../components/app-header/app-header.component';
import { FooterComponent } from '../../../layout/footer/footer.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, FooterComponent],
  templateUrl: './dashboard-layout.component.html'
})
export class DashboardLayoutComponent { }