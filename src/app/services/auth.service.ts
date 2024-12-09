import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  getIsAuthenticated() {
    throw new Error('Method not implemented.');
  }
  getIsAdmin() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api/auth/authenticate';

  constructor(private http: HttpClient) {}

  // login(username: string, password: string) {
  //   return this.http.post<{ isAdmin: boolean }>(this.apiUrl, { username, password });
  // }
  login(username: string, password: string) {
    return this.http.post('/api/login', { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Ensure this is set correctly
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }

  
}
