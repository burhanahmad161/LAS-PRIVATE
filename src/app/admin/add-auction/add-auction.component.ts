import { Component } from '@angular/core';
import { AuctionService } from '../../services/auction.service';

export interface Auction {
  name: string;
  startingPrice: number;
  description: string;
  duration: number; // in hours
  category: string; // Auction category
  productImage: File | null; // Product image file
}

@Component({
  selector: 'app-add-auction',
  templateUrl: './add-auction.component.html',
  styleUrls: ['./add-auction.component.css'], // Ensure this is correct
})
export class AddAuctionComponent {
  auction: Auction = {
    name: '',
    startingPrice: 0,
    description: '',
    duration: 0,
    category: '', // Initialize category as empty
    productImage: null,
  };

  selectedFile: File | null = null;
  categories: string[] = ['Electronics', 'Fashion', 'Home & Garden', 'Others']; // Auction categories

  constructor(private auctionService: AuctionService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (
      this.selectedFile &&
      this.auction.name &&
      this.auction.startingPrice &&
      this.auction.description &&
      this.auction.duration &&
      this.auction.category
    ) {
      const formData = new FormData();
      formData.append('name', this.auction.name);
      formData.append('startingPrice', this.auction.startingPrice.toString());
      formData.append('description', this.auction.description);
      formData.append('duration', this.auction.duration.toString());
      formData.append('category', this.auction.category);
      formData.append('productImage', this.selectedFile);

      this.auctionService.addAuction(formData).subscribe(
        (response) => {
          console.log('Auction added successfully:', response);
          // Optionally, reset the form
          this.resetForm();
        },
        (error) => {
          console.error('Error adding auction:', error);
        }
      );
    } else {
      console.error('Please fill all fields and select an image.');
    }
  }

  resetForm(): void {
    this.auction = {
      name: '',
      startingPrice: 0,
      description: '',
      duration: 0,
      category: '',
      productImage: null,
    };
    this.selectedFile = null;
  }
}
