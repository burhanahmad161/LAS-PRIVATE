import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private apiUrl = 'http://localhost:3000/api/user'; // Base URL for user-related API
  private loginUrl = 'http://localhost:3000/api/user/login'; // URL for login
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken()); // Initialize based on token presence
  private userDetails = new BehaviorSubject<any>(null); // BehaviorSubject to hold user details
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {
    // Automatically fetch user details if the user is logged in
    if (this.loggedIn.value) {
    }
  }
  private apiUrl2 = 'http://your-api-url/api/client-users'; // Adjust to your API URL

  // constructor(private http: HttpClient) {}

  getUserById(userid: string): Observable<any> {
    return this.http.get(`${this.apiUrl2}/${userid}`);
  }

  private hasToken(): boolean {
    // Check if the token exists in local storage
    return !!localStorage.getItem('token');
  }
  // Get user from localStorage
  private getUserFromStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  getUserNotificationsByFirstName(firstName: string): Observable<any[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found. User is not logged in.');
      return of([]); // Return an empty array if no token is present
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const apiUrl = `http://localhost:3000/api/client-users/notifications?firstName=${firstName}`;

    return this.http.get<any[]>(apiUrl, { headers }).pipe(
      tap((notifications) => {
        console.log('Fetched notifications:', notifications);
      }),
      catchError((error) => {
        console.error('Failed to fetch notifications:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  // Add a new notification to the user's notifications array
  addNotificationToUser(firstName: string, auctionName:string ,newNotification: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
        console.error('No token found. User is not logged in.');
        return of(null); // Handle unauthorized access
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const body = { firstName, auctionName ,message: newNotification }; // Corrected field name
    const apiUrl = 'http://localhost:3000/api/user/client-users/notifications/add'; // Direct API URL

    return this.http.post(apiUrl, body, { headers }).pipe(
        tap((response) => {
            console.log('Added new notification:', response);
            this.toastr.success('Notification added successfully', 'Success');
        }),
        catchError((error) => {
            console.error('Failed to add notification:', error);
            this.toastr.error('Failed to add notification.', 'Error');
            return of(null);
        })
    );
}


  // Get the user ID from the stored user details in localStorage
  getUserId(): string | null {
    const user = this.getUserFromStorage();
    return user ? user._id : null; // Return user ID or null if not available
  }
  getUserName(): string | null {
    const user = this.getUserFromStorage();
    return user ? user.firstName : null; // Return user ID or null if not available
  }

  login(email: string, password: string) {
    this.http.post<{ token: string; message?: string; user: any }>(this.loginUrl, { email, password })
      .subscribe({
        next: (response) => {
          if (response.user) { // Ensure user data exists
            localStorage.setItem('userid', response.user._id); // Assuming user ID is in _id field
            localStorage.setItem('user', JSON.stringify(response.user)); // Store the entire user information
          } else {
            console.error('No user data returned from login.');
          }
          if (response.token) {
            localStorage.setItem('token', response.token); // Store the token
            this.loggedIn.next(true); // Update login state
            this.router.navigate(['/']); // Redirect to home page

            // Show success toast
            this.toastr.success('Login successful', 'Welcome Back!');
          } else {
            console.error('Token not returned.');
          }
        },
        error: (err) => {
          console.error('Login failed', err);

          // Show error toast
          this.toastr.error('Login failed. Please check your credentials.', 'Error');
        }
      });
  }

  private fetchUserDetails(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, user is not logged in.');
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get(`${this.apiUrl}/me`, { headers })
      .pipe(
        tap((user) => {
          this.userDetails.next(user); // Update user details in BehaviorSubject
        }),
        catchError((error) => {
          console.error('Failed to fetch user details', error);
          this.logout(); // Logout if fetching user details fails
          return of(null);
        })
      )
      .subscribe();
  }



  // Method to check if user is logged in
  isLoggedIn() {
    return this.loggedIn.asObservable(); // Return observable for subscribed components
  }


  getUserDetails(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    console.log('JWT Token before API call:', token); // Log it before the API call

    if (!token) {
      console.error('No token found, user is not logged in.');
      return of(null); // Handle it as per your application flow
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Use the retrieved token
    });

    return this.http.get(`http://localhost:3000/api/me`, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to fetch user details', error);
        return of(null); // Return null or some default value in case of error
      })
    );
  }

  //Notification Adding

  // Signup method
  signup(email: string, password: string, firstName: string, lastName: string, notifications: any[], winningBid: string): Observable<any> {
    const body = { email, password, firstName, lastName, notifications, winningBid };
    // console.log("Sending request to signup:", body); // Log the body to verify it's correct
    return this.http.post(`http://localhost:3000/api/user/signup`, body);
  }
  

  // Logout method
  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false); // Update login state
    this.userDetails.next(null); // Clear user details
    this.router.navigate(['/']); // Redirect to home or login page
  }

  // Method to get the stored token
  getToken() {
    return localStorage.getItem('token');
  }
}
