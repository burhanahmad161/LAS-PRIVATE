import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.isAdmin) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.loginError = true;
        }
      },
      error => {
        this.loginError = true;
        console.error('Login error', error);
      }
    );
  }
}
