import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit, OnDestroy {
  auctions: any[] = []; // All auctions
  activeAuctions: any[] = []; // Active auctions
  filteredAuctions: any[] = []; // Auctions filtered by selected category
  selectedCategory: string = 'all'; // Default to show all categories
  intervalId: any;

  constructor(private auctionService: AuctionService, private router: Router) {}

  ngOnInit(): void {
    this.getAuctions();
    this.intervalId = setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getAuctions(): void {
    this.auctionService.getAuctions().subscribe(
      (data) => {
        this.auctions = data.map((auction: any) => {
          const createdAt = new Date(auction.createdAt);
          const durationInMs = auction.duration * 60 * 60 * 1000; // Convert hours to milliseconds
          auction.endTime = new Date(createdAt.getTime() + durationInMs); // Calculate end time
          return auction;
        });

        this.filterActiveAuctions();
        this.filterByCategory(); // Initial filter
      },
      (error) => {
        console.error('Error fetching auctions:', error);
      }
    );
  }

  filterActiveAuctions(): void {
    const now = new Date();
    this.activeAuctions = this.auctions.filter((auction) => {
      const timeLeft = auction.endTime.getTime() - now.getTime();
      return timeLeft > 0;
    });
  }

  filterByCategory(): void {
    if (this.selectedCategory === 'all') {
      this.filteredAuctions = this.activeAuctions; // Show all active auctions
    } else {
      this.filteredAuctions = this.activeAuctions.filter(
        (auction) => auction.category === this.selectedCategory
      );
    }
  }

  onCategoryChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCategory = selectedValue;
    this.filterByCategory();
  }

  updateRemainingTime(): void {
    const now = new Date();
    this.activeAuctions.forEach((auction) => {
      const timeLeft = auction.endTime.getTime() - now.getTime();
      if (timeLeft > 0) {
        auction.remainingTime = this.formatTime(timeLeft);
      } else {
        this.filterActiveAuctions();
        this.filterByCategory(); // Update filtered list
      }
    });
  }

  formatTime(timeInMs: number): string {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  navigateToBidding(auctionId: string): void {
    this.router.navigate(['/bidding', auctionId]);
  }
}
