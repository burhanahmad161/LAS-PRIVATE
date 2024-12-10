import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {
  private apiUrl = 'http://localhost:3000/api/contact/';  // API base URL

  constructor(private http: HttpClient) {}

  // Fetch contact requests from the backend
  getContactRequests(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}contact-reqs`);
  }

  markAsRead(contactId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}mark-as-read/${contactId}`, {});
  }
}
