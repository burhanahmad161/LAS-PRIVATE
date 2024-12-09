import { Component, OnInit } from '@angular/core';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-delete-auction',
  templateUrl: './delete-auction.component.html',
  styleUrl: './delete-auction.component.css'
})
export class DeleteAuctionComponent implements OnInit {
  auctions: any[] = []; // Array to hold all auctions

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.getAuctions(); // Fetch all auctions when the component loads
  }

  getAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      (data) => {
        // Populate auctions array with fetched data
        this.auctions = data.map((auction: any) => {
          auction.imageUrl = `${auction.productImage.replace(/\\/g, '/')}`;
          return auction;
        });
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  // Method to delete an auction by its ID
  deleteAuction(auctionId: string): void {
    if (confirm('Are you sure you want to delete this auction?')) {
      this.auctionService.deleteAuction(auctionId).subscribe(
        (response) => {
          console.log('Auction deleted:', response);
          this.getAuctions(); // Refresh the auction list after deletion
        },
        (error) => {
          console.error('Error deleting auction:', error);
        }
      );
    }
  }
}
