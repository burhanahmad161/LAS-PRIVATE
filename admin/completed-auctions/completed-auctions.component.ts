import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';
import { AuthorizationService } from '../../services/authorization.service';
import { OrderService } from '../../services/order.service';
@Component({
  selector: 'app-completed-auctions',
  templateUrl: './completed-auctions.html',
  styleUrls: ['./completed-auctions.component.css']
})
export class CompletedAuctions {
  auctions: any[] = [];
  isLoading = true;
  error: string = '';
  // bids: any[] = [];

  constructor(
    private auctionService: AuctionService,
    private AuthorizationService: AuthorizationService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadAuctions();
  }

  loadAuctions(): void {
    this.auctionService.getAuctions().subscribe({
      next: (data) => {
        this.auctions = data
          .map((auction: { createdAt: string; duration: number; bids: any[]; }) => ({
            ...auction,
            endTime: this.calculateEndTime(auction.createdAt, auction.duration),
            formattedDuration: this.formatDuration(auction.duration),
            highestBidder: this.getHighestBidder(auction.bids),
            participants: this.getParticipants(auction.bids),
            bids: auction.bids,
          }))
          .filter((auction: any) => this.isAuctionCompleted(auction));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error fetching auctions';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  calculateEndTime(createdAt: string, duration: number): string {
    const createdDate = new Date(createdAt);
    createdDate.setMinutes(createdDate.getMinutes() + duration);
    return createdDate.toISOString();
  }

  isAuctionCompleted(auction: any): boolean {
    const currentTime = new Date().getTime();
    const endTime = new Date(auction.endTime).getTime();
    return endTime <= currentTime;
  }

  formatDuration(duration: number): string {
    if (duration >= 1440) {
      const days = Math.floor(duration / 1440);
      const hours = Math.round((duration % 1440) / 60);
      return `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (duration < 60) {
      return `${duration} minute${duration > 1 ? 's' : ''}`;
    } else {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
  }

  getHighestBidder(bids: any[]): string {
    if (!bids || bids.length === 0) return 'No bids';
    const highestBid = bids.reduce((maxBid, currentBid) => currentBid.amount > maxBid.amount ? currentBid : maxBid);
    return highestBid ? highestBid.bidderName : 'No bids';
  }

  getParticipants(bids: any[]): string[] {
    if (!bids || bids.length === 0) return [];
    return bids.map(bid => bid.bidderName);
  }

  // sendNotifications(auction: any): void {
  //   if (!Array.isArray(auction.bids)) {
  //     console.error('Bids are not in the correct format:', auction.bids);
  //     return;
  //   }
  
  //   auction.bids.forEach((bid: any) => {
  //     if (!bid.bidderName || !auction.highestBidder) {
  //       console.error('Missing bidder information:', bid, auction);
  //       return;
  //     }
  
  //     const isWinner = bid.bidderName === auction.highestBidder;
  //     const message = isWinner
  //       ? `Congratulations! You won the auction for "${auction.name}".`
  //       : `You lost the auction for "${auction.name}".`;
  
  //     console.log(`Sending notification to ${bid.bidderName}: ${message}`);
  
  //     this.AuthorizationService.addNotificationToUser(bid.bidderName, message).subscribe({
  //       next: () => {
  //         console.log(`Notification sent to ${bid.bidderName}`);
  //       },
  //       error: (err) => {
  //         console.error(`Failed to send notification to ${bid.bidderName}:`, err);
  //       }
  //     });
  //   });
  // }

  sendNotifications(auction: any): string | null {
    if (!Array.isArray(auction.bids)) {
      console.error('Bids are not in the correct format:', auction.bids);
      return null;
    }
  
    auction.bids.forEach((bid: any) => {
      if (!bid.bidderName || !auction.highestBidder) {
        console.error('Missing bidder information:', bid, auction);
        return;
      }
  
      const isWinner = bid.bidderName === auction.highestBidder;
      const message = isWinner
        ? `Congratulations! You won the auction for "${auction.name}".`
        : `You lost the auction for "${auction.name}".`;
  
      console.log(`Sending notification to ${bid.bidderName}: ${message}`);
  
      this.AuthorizationService.addNotificationToUser(bid.bidderName, message).subscribe({
        next: () => {
          console.log(`Notification sent to ${bid.bidderName}`);
        },
        error: (err) => {
          console.error(`Failed to send notification to ${bid.bidderName}:`, err);
        }
      });
    });
  
    // Return the auction name
    return auction.name;
  }
  

  submitOrder(bids: any[], auction:any): void {
    const winnerName = this.getHighestBidder(bids); // Get the highest bidder's name
    const auctionName = this.sendNotifications(auction); // Capture the auction name
    console.log(auctionName);
    if (winnerName === 'No bids') {
      alert('No bids available to create an order.');
      return;
    }
  
    const orderData = {
      winnerName: winnerName,
      winningBid: Math.max(...bids.map(bid => bid.amount)), // Extract the highest bid amount
      address: '', // Optional: send as an empty string
      phone: '',
      auctionName: auctionName, // Assign auction name to the order
      status: 'Pending', // Optional: default can be set in the backend
    };
  
    this.orderService.createOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order created successfully:', response);
        alert('Order created successfully!');
      },
      error: (error) => {
        console.error('Error creating order:', error);
        alert('Failed to create order. Please try again.');
      }
    });
  }
  
  handleAuctionEnd(auction: any): void {
    // First, send notifications to all bidders
    this.sendNotifications(auction);
  console.log("loru auction: ", auction)
    // Then, submit the order for the highest bidder
    this.submitOrder(auction.bids, auction);
  }
  

  // getHighestBidder(bids: any[]): string {
  //   if (!bids || bids.length === 0) return 'No bids';
  //   const highestBid = bids.reduce((maxBid, currentBid) =>
  //     currentBid.amount > maxBid.amount ? currentBid : maxBid
  //   );
  //   return highestBid ? highestBid.bidderName : 'No bids';
  // }
  

  fetchNotificationsForParticipant(participantName: string): void {
    this.AuthorizationService.getUserNotificationsByFirstName(participantName).subscribe({
      next: (notifications) => {
        console.log(`Notifications for ${participantName}:`, notifications);
      },
      error: (err) => {
        console.error(`Failed to fetch notifications for ${participantName}: `, err);
      }
    });
  }
}
