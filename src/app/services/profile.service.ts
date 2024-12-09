import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private user = { name: 'John Doe', email: 'john.doe@example.com' };

  constructor() {}

  getUser() {
    // Simulate fetching logged-in user data
    return this.user;
  }
}
