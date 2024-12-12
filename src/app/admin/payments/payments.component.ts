import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit {
    payments: any[] = [];  // Array to hold the payment data
    errorMessage: string = '';
  
    constructor(private paymentService: PaymentService) {}
  
    ngOnInit(): void {
      this.getPayments();
    }
  
    getPayments(): void {
      this.paymentService.getPayments().subscribe(
        (response) => {
          this.payments = response.payments;
        },
        (error) => {
          this.errorMessage = 'Error fetching payments!';
          console.error(error);
        }
      );
    }
  }