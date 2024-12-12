import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;  // For controlling the loading spinner
  loginError: boolean = false;  // For showing the invalid credentials message


  constructor(private authService: AuthService, private adminService: AdminService,private router: Router) {}

  // onLogin() {
  //   this.authService.login(this.username, this.password).subscribe(
  //     response => {
  //       if (response.isAdmin) {
  //         this.router.navigate(['/admin-dashboard']);
  //       } else {
  //         this.loginError = true;
  //       }
  //     },
  //     error => {
  //       this.loginError = true;
  //       console.error('Login error', error);
  //     }
  //   );
  // }

  // onlogin() {
  //   this.adminService.login(this.email, this.password).subscribe(
  //     (response) => {
  //       // Save token in local storage or service for session management
  //       localStorage.setItem('adminToken', response.token);
  //       this.router.navigate(['/admin-dashboard']);
  //     },
  //     (error) => {
  //       this.errorMessage = error.error.message;
  //     }
  //   );
  // }

  onLogin() {
    this.loading = true;
    this.loginError = false;  // Reset error state

    this.adminService.login(this.username, this.password).subscribe(
      (response) => {
        // Save token in local storage or service for session management
        localStorage.setItem('adminToken', response.token);
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        this.loading = false;
        this.loginError = true;
        console.error('Login error', error);
      }
    );
  }
}
