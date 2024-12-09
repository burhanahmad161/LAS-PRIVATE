import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { UsersService } from '../../services/users.service';
import { AuctionService } from '../../services/auction.service';
import { OrderService } from '../../services/order.service';

declare var window: any; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any;
  menuVisible = false;
  isLoggedIn: boolean = false;
  userDetails: any;
  showMyBidsPopup: boolean = false;
  showNotificationsPopup : boolean = false;
  showOrdersPopup: boolean = false;
  userBids: Array<{ auctionName: string; bidAmount: number; bidTime:string }> = [];
  userId: string = '';  // Define userId
  notificationsVisible: boolean = false;

  userx = {
    orders: [] as any[],  // Array to store orders from the backend
  };

  // Toggles the visibility of the notifications dropdown
  toggleNotifications(event: Event) {
    event.preventDefault();  // Prevent the default anchor tag behavior (page refresh)
    this.notificationsVisible = !this.notificationsVisible;
  }

  openModal(event: Event) {
    event.preventDefault();
    const modal = new window.bootstrap.Modal(document.getElementById('profileModal'));
    modal.show();
  }

  closeModal() {
    const modal = document.getElementById('profileModal');
    modal!.style.display = 'none';
  }

  constructor(
    private router: Router,
    public authService: AuthorizationService,
    private userService: UsersService,
    private auctionService: AuctionService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    console.log('Stored User:', storedUser);  // Log the raw stored user data
    this.fetchOrders(this.userId);

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log('Parsed User:', this.user);  // Log the parsed user object
      // Check which property contains the user ID (_id or id or something else)
      this.userId = this.user?._id || this.user?.id;
      console.log('User ID:', this.userId);  // Log the extracted user ID
    } else {
      console.error('No user data found in localStorage.');
    }
  
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn && !this.userId) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
          this.userId = this.user?._id || this.user?.id;
          console.log('User ID after login check:', this.userId); // Log the userId after login check
        }
      } else if (!loggedIn) {
        console.error('User is not logged in.');
      }
    });
  }
  
  fetchOrders(userId: string): void {
    this.orderService.getUserOrders(userId).subscribe({
      next: (orders) => {
        this.user.orders = orders;
      },
      error: (err) => {
        console.error('Error fetching orders', err);
      },
    });
  }

  openMyBidsPopup(): void {
    if (this.userId) {
      this.showMyBidsPopup = true;
      this.fetchUserBids();
    } else {
      console.error('User ID not found.');
    }
  }

  // openOrders(): void {
  //   if (this.userId) {
  //     this.showOrdersPopup = true;
  //     // this.fetchUserBids();
  //   } else {
  //     console.error('User ID not found.');
  //   }
  // }


  openNotificationsPopup(): void {
    if (this.userId) {
      this.showNotificationsPopup = true;
      // this.fetchUserBids();
    } else {
      console.error('User ID not found.');
    }
  }
  closeNotificationsPopup(): void {
    this.showNotificationsPopup = false;
  }
  closeMyBidsPopup(): void {
    this.showMyBidsPopup = false;
  }

  closeOrderPopup(): void {
    this.showOrdersPopup = false;
  }

  // fetchUserBids(): void {
  //   if (!this.userId) {
  //     console.error('User ID not found.');
  //     return;
  //   }
  
  //   console.log('Fetching bids for User ID:', this.userId);  // Log userId before fetching bids
  
  //   this.auctionService.getUserBids(this.userId).subscribe((bids: any[]) => {
  //     if (bids && bids.length > 0) {
  //       console.log('Bids fetched successfully:', bids);  // Log the fetched bids
  //       this.userBids = bids.map(bid => ({
  //         userId: bid.userId,
  //         auctionName: bid.auctionName,
  //         amount: bid.amount,
  //         bidTime: new Date(bid.bidTime).toLocaleString(),
  //       }));
  //     } else {
  //       console.log('No bids found for this user.');
  //     }
  //   }, error => {
  //     console.error('Error fetching bids:', error);
  //   });
  // }
  
  fetchUserBids(): void {
    if (!this.userId) {
      console.error('User ID not found. Ensure user is logged in and userId is set.');
      return;
    }
  
    console.log('Fetching bids for User ID:', this.userId);
  
    this.auctionService.getUserBids(this.userId).subscribe(
      (bids: any[]) => {
        if (bids && bids.length > 0) {
          console.log('Bids fetched successfully:', bids);
          this.userBids = bids.map(bid => ({
            auctionName: bid.auctionName,
            bidAmount: bid.bidAmount,
            bidTime: new Date(bid.bidTime).toLocaleString(),
          }));
        } else {
          console.log('No bids found for this user.');
        }
      },
      error => {
        console.error('Error fetching bids:', error);
      }
    );
  }
  
  openOrders(event: Event): void {
    event.preventDefault();  // Prevent the default anchor tag behavior (page refresh)

    this.showOrdersPopup = true;
  }

  closeOrdersPopup(): void {
    this.showOrdersPopup = false;
  }

  onLogout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}