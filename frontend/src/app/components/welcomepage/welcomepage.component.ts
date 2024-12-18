import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcomepage',
  standalone: true,
  imports: [],
  templateUrl: './welcomepage.component.html',
  styleUrl: './welcomepage.component.css'
})
export class WelcomepageComponent {

  constructor(private router: Router) {}

  navigateToSignup(): void {
    this.router.navigate(['/signup']);
  }
}
