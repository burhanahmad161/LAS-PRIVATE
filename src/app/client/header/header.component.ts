import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';
import { UsersService } from '../../services/users.service';
import { AuctionService } from '../../services/auction.service';
import { OrderService } from '../../services/order.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'bootstrap';
import { ToastrService } from 'ngx-toastr';

declare var bootstrap: any;

declare var window: any; 

interface Order {
  auctionName: string;
  winnerName: string;
  // Add other properties here based on your API response
  // e.g., orderId, price, status, etc.
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @ViewChild('orderModal') orderModal: any;
  userx = { orders: [] };  // Store fetched orders

  user: any;
  menuVisible = false;
  isLoggedIn: boolean = false;
  userDetails: any;
  showMyBidsPopup: boolean = false;
  showNotificationsPopup : boolean = false;
  // showOrdersPopup: boolean = false;
  userBids: Array<{ auctionName: string; bidAmount: number; bidTime:string }> = [];
  userId: string = '';  // Define userId
  notificationsVisible: boolean = false;

  order = {
    phoneNumber: '',
    address: ''
  };

  showOrdersPopup = false; // Control visibility of the popup
  orders: Order[] = []; // Define orders as an array of Order objects

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
  // openOrders(event: Event) {
  //   event.preventDefault();
  //   const modal = new window.bootstrap.Modal(document.getElementById('OrdersModal'));
  //   modal.show()
  // }
  

  closeModal() {
    const modal = document.getElementById('profileModal');
    modal!.style.display = 'none';
  }

  constructor(
    private router: Router,
    public authService: AuthorizationService,
    private userService: UsersService,
    private auctionService: AuctionService,
    private orderService: OrderService,
    private http: HttpClient,
    private modelService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    // console.log('Stored User:', storedUser);  // Log the raw stored user data

    if (storedUser) {
      this.user = JSON.parse(storedUser);
      // console.log('Parsed User:', this.user);  // Log the parsed user object
      // Check which property contains the user ID (_id or id or something else)
      this.userId = this.user?._id || this.user?.id;
      // console.log('User ID:', this.userId);  // Log the extracted user ID
    } else {
      // console.error('No user data found in localStorage.');
    }
  
    this.authService.isLoggedIn().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if (loggedIn && !this.userId) {
        const userData = localStorage.getItem('user');
        if (userData) {
          this.user = JSON.parse(userData);
          this.userId = this.user?._id || this.user?.id;
          // console.log('User ID after login check:', this.userId); // Log the userId after login check
        }
      } else if (!loggedIn) {
        // console.error('User is not logged in.');
      }
    });
  }
 


  openMyBidsPopup(): void {
    if (this.userId) {
      this.showMyBidsPopup = true;
      this.fetchUserBids();
    } else {
      // console.error('User ID not found.');
    }
  }



  openNotificationsPopup(): void {
    if (this.userId) {
      this.showNotificationsPopup = true;
      // this.fetchUserBids();
    } else {
      // console.error('User ID not found.');
    }
  }
  closeNotificationsPopup(): void {
    this.showNotificationsPopup = false;
  }
  closeMyBidsPopup(): void {
    this.showMyBidsPopup = false;
  }

  openOrdersPopup(): void {
    if (this.userId) {
      this.showOrdersPopup = true;
      // this.fetchUserBids();
    } else {
      // console.error('User ID not found.');
    }
  }
  closeOrdersPopup(): void {
    this.showOrdersPopup = false;
  }
  
  placeOrder() {
    // Open the modal programmatically
    const placeOrderModal = new bootstrap.Modal(document.getElementById('placeOrderModal'));
    placeOrderModal.show();
  }

  submitOrder() {
    if (this.order.phoneNumber && this.order.address) {
      // Proceed with placing the order (You can call an API here to save the order)
      // console.log('Order placed:', this.order);

      // Close the modal after submitting
      const placeOrderModal = bootstrap.Modal.getInstance(document.getElementById('placeOrderModal'));
      placeOrderModal.hide();

      // Optionally, reset the form
      this.order = { phoneNumber: '', address: '' };
    } else {
      alert('Please provide both phone number and address.');
    }
  }

  fetchUserBids(): void {
    if (!this.userId) {
      console.error('User ID not found. Ensure user is logged in and userId is set.');
      return;
    }
  
    // console.log('Fetching bids for User ID:', this.userId);
  
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
          this.toastr.info('No bids found for this user.', 'Bid First !');
          // console.log('No bids found for this user.');
        }
      },
      error => {
        console.error('Error fetching bids:', error);
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}