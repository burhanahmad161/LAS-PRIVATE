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

// getUserOrders(winnerName: string): Observable<any[]> {
//   // Ensure the URL is using template literals to pass the userName dynamically
//   return this.http.get<any[]>(`http://localhost:3000/api/orders/${winnerName}`);
// }

getUserOrders(winnerName: string): Observable<any[]> {
  // Ensure the URL is using template literals to pass the winnerName dynamically
  return this.http.get<any[]>(`http://localhost:3000/api/orders/${winnerName}`);
}

}
