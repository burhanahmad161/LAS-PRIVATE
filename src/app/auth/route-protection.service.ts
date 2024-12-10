import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteProtectionService {
  constructor() {}

  // Check if the user is authenticated based on a token (e.g., JWT in localStorage)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); // Check if token exists
  }

  // Login the user by saving the token
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Logout the user by removing the token
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
