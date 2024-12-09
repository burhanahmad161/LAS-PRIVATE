// services/auction.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuctionService {
  private apiUrl = 'http://localhost:3000/api/auctions';

  constructor(private http: HttpClient) {}

  addAuction(auctionData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, auctionData);
  }

  getAuctions(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
    // return this.http.get(`${this.apiUrl}/uploads`);
  }

  deleteAuction(auctionId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${auctionId}`);
  }

  getAuctionDetails(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Get top bids for an auction
  getTopBids(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/top-bids`);
  }

  // Place a bid for an auction
  placeBid(auctionId: string, bidAmount: number, bidderName: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${auctionId}/place-bid`, {
      bidderName,
      amount: bidAmount,
      userId  // Add the userId here
    });
  }
  
  
  getUserBids(userId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/bids/${userId}`);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');  // Make sure this is being set correctly
  }
  
}