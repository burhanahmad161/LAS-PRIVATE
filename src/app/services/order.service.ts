import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
//   private apiUrl = 'http://localhost/api/orders/create-order'; // Replace with your backend URL
  private apiUrl = 'http://localhost:3000/api/orders/create-order'; // Base URL for user-related API

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders`);
  }

  // Method to get orders for a specific user
  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders/${userId}`);
  }
}
