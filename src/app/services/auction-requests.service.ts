// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuctionRequestsService {

//   private baseUrl = 'http://localhost:3000/api/auctions'; // Adjust as needed


//   constructor(private http: HttpClient) {}

//   // Submit a new auction request
//   submitAuctionRequest(auction: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/auction`, auction);
//   }

//   // Get all auction requests (admin panel)
//   getAuctionRequests(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}`);
//   }

//   // Approve an auction request
//   approveAuction(id: string): Observable<any> {
//     return this.http.put(`${this.baseUrl}/auction/${id}/approve`, {});
//   }

//   // Reject an auction request
//   rejectAuction(id: string): Observable<any> {
//     return this.http.put(`${this.baseUrl}/auction/${id}/reject`, {});
//   }
// }



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuctionRequestsService {

  private baseUrl = 'http://localhost:3000/api/auctions'; // Adjust as needed

  constructor(private http: HttpClient) {}

  /**
   * Submit a new auction request
   * @param auction Auction request data
   * @returns Observable of the submitted auction request
   */
  submitAuctionRequest(auction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/request`, auction);
  }

  /**
   * Get all auction requests (for admin panel)
   * @returns Observable array of auction requests
   */
  getAuctionRequests(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/auctions/request`);
  }

  /**
   * Approve an auction request
   * @param id ID of the auction to approve
   * @returns Observable of the approval response
   */
  // approveAuction(id: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/request/${id}/approve`, {});
  // }

  /**
   * Reject an auction request
   * @param id ID of the auction to reject
   * @returns Observable of the rejection response
   */
  // rejectAuction(id: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/request/${id}/reject`, {});
  // }

  approveAuction(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve/${id}`, {}); // Approve auction
}

rejectAuction(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject/${id}`, {}); // Reject auction
}

getAcceptedAuctions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`); // Get all accepted auctions
}
}
