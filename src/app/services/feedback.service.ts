import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api/feedback/';  // API base URL

  constructor(private http: HttpClient) {}

  // Submit feedback
  submitFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}submit`, feedback);
  }

  // Get all feedback
  getFeedback(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get-feedbacks`);
  }
}
