// notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private baseUrl = 'http://localhost:3000/api/user/client-users';  // Change to your backend API base URL

  constructor(private http: HttpClient) {}

  // Method to send notifications to the user
  sendNotification(userId: string, message: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, 
      { message }, 
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  
}
