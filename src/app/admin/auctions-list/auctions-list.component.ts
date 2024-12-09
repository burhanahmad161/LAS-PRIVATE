import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.css'], // Ensure plural 'styleUrls'
})
export class AuctionsListComponent {
  auctions: any[] = [];
  isLoading = true;
  error: string = '';

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data
          .filter((auction: { createdAt: string; duration: number }) => this.isAuctionActive(auction.createdAt, auction.duration))
          .map((auction: { duration: number; createdAt: string }) => ({
            ...auction,
            formattedDuration: this.calculateRemainingTime(auction.createdAt, auction.duration),
          }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching auctions';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  // Check if the auction is still active
  isAuctionActive(createdAt: string, duration: number): boolean {
    const createdDate = new Date(createdAt);
    const expiryDate = new Date(createdDate.getTime() + duration * 60 * 60 * 1000); // Add duration in hours
    return new Date().getTime() < expiryDate.getTime(); // Returns true if current time is before expiry
  }

  // Calculate remaining time for active auctions
  calculateRemainingTime(createdAt: string, duration: number): string {
    const createdDate = new Date(createdAt);
    const expiryDate = new Date(createdDate.getTime() + duration * 60 * 60 * 1000); // Add duration in hours
    const now = new Date();

    const timeDifference = expiryDate.getTime() - now.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

    let formatted = '';
    if (days > 0) formatted += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) formatted += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) formatted += `${minutes} minute${minutes > 1 ? 's' : ''}`;

    return formatted.trim();
  }
}
