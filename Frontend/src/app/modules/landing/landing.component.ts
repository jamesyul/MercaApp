import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    RouterModule,    
    HeroComponent,
    RouterLink       
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {}


