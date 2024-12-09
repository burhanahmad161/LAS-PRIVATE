import { Component } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isLoginMode = true; // Toggle between login and signup modes
  email: string = '';
  password: string = '';
 
  // constructor(private authService: AuthService) {}
  constructor(
    private authService: AuthorizationService,
    private toastr: ToastrService // Inject ToastrService
  ) {}

  onLogin() {
    this.authService.login(this.email, this.password);
  }

  onLoginClick() {
    this.isLoginMode = true;
  }

  // onSubmit(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;

  //   if (this.isLoginMode) {
  //     // Login logic
  //     // this.authService.login(email, password).subscribe(
  //     //   response => {
  //     //     console.log('Login successful');
  //     //     localStorage.setItem('token', response.token);
  //     //   },
  //     //   error => {
  //     //     console.error('Login failed:', error);
  //     //   }
  //     // );
  //   } else {
  //     // Signup logic
  //     const firstName = form.value.firstName;
  //     const lastName = form.value.lastName;

  //     this.authService.signup(email, password, firstName, lastName).subscribe(
  //       response => {
  //         console.log('Signup successful');
  //       },
  //       error => {
  //         console.error('Signup failed:', error);
  //       }
  //     );
  //   }

  //   form.reset();
  // }

  

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      // Handle login
      
    } else {
      // Handle signup logic (you should implement a similar signup method in your AuthService)
      const firstName = form.value.firstName;
      const lastName = form.value.lastName;
      const notifications = ["Welcome to the platform!", "Your account has been created successfully."];

      this.authService.signup(email, password, firstName, lastName, notifications).subscribe(
        response => {
          this.toastr.success('Signup successful', 'Success');
        },
        error => {
          this.toastr.error('Signup failed. Please try again.', 'Error');
        }
      );
      
    }
  }
}
