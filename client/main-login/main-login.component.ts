import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrl: './main-login.component.css'
})
export class MainLoginComponent {
  constructor(private router: Router) {}
  skipLogin() {
    // Navigate to the home page or whichever page users should be redirected to
    this.router.navigate(['/home']);
  }
  
}
