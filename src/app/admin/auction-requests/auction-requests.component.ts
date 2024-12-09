

// Define the Auction interface for easy access at the top
interface Auction {
  _id: string;
  name: string;
  startingPrice: number;
  description: string;
  duration: number;
  productImage: string;
  createdAt: Date;
}

import { Component, OnInit } from '@angular/core';
import { AuctionRequestsService } from '../../services/auction-requests.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auction-requests',
  templateUrl: './auction-requests.component.html',
  styleUrls: ['./auction-requests.component.css']
})
export class AuctionRequestsComponent implements OnInit {
  auctionRequests: Auction[] = [];  // Typed array of Auction objects
  auctions: Auction[] = [];         // Array for accepted auctions

  constructor(private auctionRequestsService: AuctionRequestsService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchAuctionRequests();
  }

  getFlooredDuration(duration: number): number {
    return Math.floor(duration);
  }

  fetchAuctionRequests() {
    this.auctionRequestsService.getAuctionRequests().subscribe(
      (response: any) => {
        this.auctionRequests = response;
        console.log(this.auctionRequests); // Debugging: Check if each auction has a valid `_id`
      },
      (error) => {
        console.error('Error fetching auction requests', error);
      }
    );
  }

  // approveAuction(auctionId: string): void {
  //   this.httpClient.put(`http://localhost:3000/api/auctions/request/${auctionId}/approve`, {})
  //     .subscribe(
  //       (response) => {
  //         console.log('Auction approved successfully', response);
  //         // Remove the approved auction from the list
  //         this.auctionRequests = this.auctionRequests.filter(auction => auction._id !== auctionId);
  //       },
  //       (error) => {
  //         console.error('Error approving auction:', error);
  //       }
  //     );
  // }

  approveAuction(auctionId: string): void {
    this.httpClient.put(`http://localhost:3000/api/auctions/request/${auctionId}/approve`, {})
      .subscribe(
        (response) => {
          console.log('Auction approved successfully', response);
          // Remove the approved auction from the list of pending requests
          this.auctionRequests = this.auctionRequests.filter(auction => auction._id !== auctionId);
        },
        (error) => {
          console.error('Error approving auction:', error);
        }
      );
  }

  rejectAuction(auctionId: string) {  
    this.httpClient.put(`http://localhost:3000/api/auctions/request/${auctionId}/reject`, {})
      .subscribe(
        (response) => {
          console.log('Auction rejected successfully', response);
  
          // Optimistically update the UI without re-fetching
          this.auctionRequests = this.auctionRequests.filter(
            (auction) => auction._id !== auctionId
          );
        },
        (error) => {
          console.error('Error rejecting auction:', error);
        }
      );
  }
  
}
