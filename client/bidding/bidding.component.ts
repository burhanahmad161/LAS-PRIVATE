import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../services/auction.service';
import { AuthService } from '../../services/auth.service';
import { AuthorizationService } from '../../services/authorization.service';
import { ToastrService } from 'ngx-toastr';

export interface Bid {
  item: string;
  amount: number;
  image: string; // Image property to hold the auction item's image URL
}

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {
  auction: any = {};
  topBids: Array<{ bidderName: string; amount: number }> = [];
  newBidAmount: number = 0;
  currentUser: any;

  

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private authService: AuthorizationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const auctionId = this.route.snapshot.paramMap.get('id');
    if (auctionId) {
      this.loadAuctionDetails(auctionId);
      this.loadTopBids(auctionId);
    }
  }

  loadAuctionDetails(auctionId: string): void {
    this.auctionService.getAuctionDetails(auctionId).subscribe((data: any) => {
      this.auction = data;
    });
  }

  loadTopBids(auctionId: string): void {
    this.auctionService.getTopBids(auctionId).subscribe((bids: { bidderName: string; amount: number }[]) => {
      this.topBids = bids;
    });
  }

  submitBid(): void {
    // Check if there are any existing bids
    const currentHighestBid = this.topBids.length > 0 ? this.topBids[0].amount : this.auction.startingPrice;
  
    // Validate that the new bid is higher than the current highest bid
    if (this.newBidAmount <= currentHighestBid) {
      this.toastr.error(`Your bid must be greater than the current highest bid of ${currentHighestBid}.`);
      return;
    }
  
    // Get userId from AuthorizationService, and default to empty string if null
    const userId = this.authService.getUserId() || '';
    const bidderName = this.authService.getUserName() || 'Anonymous'; // Replace with actual method to get the user's name
  
    // Proceed with placing the bid
    this.auctionService.placeBid(this.auction._id, this.newBidAmount, bidderName, userId).subscribe({
      next: () => {
        this.toastr.success('Bid placed successfully!');
        this.loadTopBids(this.auction._id);
        this.newBidAmount = 0; // Reset the input
      },
      error: () => {
        this.toastr.error('Failed to place bid. Please try again.');
      },
    });
  }
}