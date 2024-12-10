import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrl: './sell-item.component.css'
})
export class SellItemComponent implements OnInit {
  isLoggedIn: boolean = false;

  item: any = {
    name: '',
    description: '',
    startingBid: '',
    auctionEndTime: '',
    category: '' // Add a property for the auction category
  };

  selectedFile: File | null = null;

  apiUrl = 'http://localhost:3000/api/auctions';

  categories: string[] = ['Electronics', 'Fashion', 'Home & Garden', 'Others']; // Auction categories

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.isLoggedIn) {
      alert('Please log in to post an auction.');
      return;
    }

    if (!this.selectedFile) {
      this.toastr.error('Please upload an image.', 'Image Required');
      return;
    }

    const currentTime = new Date().getTime();
    const auctionEndTime = new Date(this.item.auctionEndTime).getTime();
    const durationInHours = (auctionEndTime - currentTime) / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      this.toastr.error('Please select end time in the future.', 'Failure');
      return;
    }

    if (!this.item.category) {
      this.toastr.error('Please select an auction category.', 'Category required');
      return;
    }

    if(!this.item.name) {
      this.toastr.error('Please enter auction name', 'Name required')
    }

    if(!this.item.description) {
      this.toastr.error('Please enter a description.', 'Description required')
    }
    const formData = new FormData();
    formData.append('name', this.item.name);
    formData.append('description', this.item.description);
    formData.append('startingPrice', this.item.startingBid);
    formData.append('duration', durationInHours.toString());
    formData.append('category', this.item.category);
    formData.append('productImage', this.selectedFile);

    this.http.post(`${this.apiUrl}/request/add`, formData).subscribe(
      (response: any) => {
        this.toastr.success('Auction listed successfully!', 'Success');
      },
      (error) => {
        this.toastr.error('Error listing auction:', 'Error');
        // alert('Error listing auction.');
      }
    );
  }
}
