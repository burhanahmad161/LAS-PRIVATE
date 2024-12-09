import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

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

  constructor(private http: HttpClient) {}

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
      alert('Please upload an image.');
      return;
    }

    const currentTime = new Date().getTime();
    const auctionEndTime = new Date(this.item.auctionEndTime).getTime();
    const durationInHours = (auctionEndTime - currentTime) / (1000 * 60 * 60);

    if (durationInHours <= 0) {
      alert('Please select an auction end time in the future.');
      return;
    }

    if (!this.item.category) {
      alert('Please select an auction category.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.item.name);
    formData.append('description', this.item.description);
    formData.append('startingPrice', this.item.startingBid);
    formData.append('duration', durationInHours.toString());
    formData.append('category', this.item.category); // Append category to the form data
    formData.append('productImage', this.selectedFile);

    this.http.post(`${this.apiUrl}/request/add`, formData).subscribe(
      (response: any) => {
        alert('Auction listed successfully!');
      },
      (error) => {
        console.error('Error listing auction:', error);
        alert('Error listing auction.');
      }
    );
  }
}
